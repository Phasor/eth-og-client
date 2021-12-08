import Card from './Card';
import { useWeb3React } from '@web3-react/core';
import { useState, useEffect } from 'react';
import Canvas from './Canvas';

export default function Main() {
    const [firstBlockNumber, setFirstBlockNumber] = useState(0);
    const [firstBlockDate, setFirstBlockDate] = useState(null);
    const [firstYear, setFirstYear] = useState(null);
    const [metaDataUrl, setMetaDataUrl] = useState("");
    const [imageBuffer, setImageBuffer] = useState(null);
    const [signature, setSignature] = useState(null);
    const [isError, setIsError] = useState(false);
    const [Error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const { active, account } = useWeb3React();

    useEffect(() => {
        const getData = async () => {

            if (active) {
                try {
                    setIsLoading(true);
                    const API_URL = `http://localhost:4000/api/url/?add=${account}&key=${process.env.REACT_APP_API_KEY}`;
                    const apiResponse = await fetch(API_URL);
                    const apiData = await apiResponse.json();
                    //console.log(apiData);

                    //set state from api call
                    setFirstBlockNumber(apiData.firstBlock);
                    setFirstBlockDate(apiData.date);
                    setFirstYear(apiData.firstYear);
                    setImageBuffer(apiData.image.data)
                    setMetaDataUrl(apiData.url);
                    setSignature(apiData.signature);
                    setIsError(false)
                    setIsLoading(false);
                    if (firstBlockNumber !== 0) {
                        setIsDataLoaded(true);
                    }
                }
                catch (error) {
                    console.log(error);
                    setIsError(true);
                    setIsLoading(false);
                    setError(error);
                }
            }
        }
        getData();

    }, [account, firstBlockNumber, active])

    return (
        <div className="main">
            <div className="main-container">
                <Card>

                    {!active && <p>Please Connect MetaMask to Rinkeby.</p>}
                    {isError && <p>Something went wrong.{Error}</p>}
                    {isLoading && <div>Loading..</div>}
                    {isDataLoaded && active && (
                        <>
                            <p className="main-card__first-date">First Block Number:
                                <span className="text-highlight">{firstBlockNumber}</span></p>

                            <p className="main-card__first-date">First Transaction Date:
                                <span className="text-highlight"><br />{firstBlockDate}</span></p>

                            <span className="nft-preview"><p>NFT Preview</p></span>

                            <figure className="main-card__pic-preview">

                                <Canvas height={400} width={400} firstBlockDate={firstBlockDate}
                                    firstYear={firstYear} finalImage={imageBuffer}
                                    metaDataUrl={metaDataUrl} signature={signature}
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
