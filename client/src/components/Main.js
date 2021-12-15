import Card from './Card';
import { useWeb3React } from '@web3-react/core';
import { useState, useEffect } from 'react';
import Canvas from './Canvas';

export default function Main() {
    const [firstBlockNumber, setFirstBlockNumber] = useState(0);
    const [firstYear, setFirstYear] = useState(null);
    const [apiMessage, setApiMessage] = useState(null);
    const [imageBuffer, setImageBuffer] = useState(null);
    const [signature, setSignature] = useState(null);
    const [isError, setIsError] = useState(false);
    const [Error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const { active, account, chainId } = useWeb3React();

    useEffect(() => {
        const getData = async () => {

            if (active) {

                try {
                    setIsLoading(true);
                    const API_URL = `http://localhost:4000/api/url/?add=${account}&key=${process.env.REACT_APP_API_KEY}`;
                    const apiResponse = await fetch(API_URL);
                    if (!apiResponse.ok) {
                        throw new Error('Network response was not OK');
                    }
                    const apiData = await apiResponse.json();
                    console.log(apiData);

                    //set state from api call
                    setFirstBlockNumber(apiData.firstBlock);
                    setFirstYear(apiData.firstYear);
                    setImageBuffer(apiData.image.data)
                    setSignature(apiData.signature);
                    setApiMessage(apiData.message);
                    setIsError(false)
                    setIsLoading(false);
                    if (firstBlockNumber !== 0) {
                        setIsDataLoaded(true);
                    }
                }
                catch (error) {
                    console.error('There has been a problem with your fetch operation:', error);
                    setIsError(true);
                    setIsLoading(false);
                    setError("API failed to fetch");
                }
            }
        }
        getData();

    }, [account, firstBlockNumber, active, Error])

    return (
        <div className="main">
            <div className="main-container">
                <Card>

                    {!active && <p>Please Connect MetaMask to Rinkeby.</p>}
                    {(chainId !== 4) && <p className="main-card__wrong-chain">Wrong Chain. Please connect to Rinkeby.</p>}
                    {isError && <p>{Error}</p>}
                    {isLoading && <div>Loading..</div>}
                    {isDataLoaded && active && (
                        <>
                            <p className="main-card__first-date">First Block Number:
                                <span className="text-highlight">{firstBlockNumber}</span></p>

                            <p className="main-card__first-date">First Transaction Year:
                                <span className="text-highlight">{firstYear}</span></p>

                            <span className="nft-preview"><p>NFT Preview</p></span>

                            <figure className="main-card__pic-preview">

                                <Canvas className="main-card__pic-preview-nft"
                                    height={450}
                                    width={450}
                                    finalImage={imageBuffer}
                                    signature={signature}
                                    apiMessage={apiMessage}
                                />

                                <figcaption>Mint Price:<span className="text-highlight"> ETH 0.05</span></figcaption>
                            </figure>
                        </>
                    )}

                </Card>
            </div>
        </div >
    )
}
