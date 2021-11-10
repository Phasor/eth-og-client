import Card from './Card';
import { useWeb3React } from '@web3-react/core';
import useAddress from '../hooks/useAddress.js';
import Canvas from './Canvas';

export default function Main(props) {

    const { active } = useWeb3React();
    const { firstBlockNumber, firstBlockDate, isError, isLoading, isDataLoaded } = useAddress();

    return (
        <div className="main">
            <div className="main-container">
                <Card>
                    {!active && <p>Please connect your MetaMask wallet.</p>}
                    {isError && <p>Something went wrong.</p>}
                    {isLoading && <div>Loading..</div>}
                    {isDataLoaded && (
                        <>
                            <p className="main-card__first-date">First Block Number:
                                <span className="text-highlight">{firstBlockNumber}</span></p>

                            <p className="main-card__first-date">First Transaction Date:
                                <span className="text-highlight"> {firstBlockDate}</span></p>

                            <figure className="main-card__pic-preview">
                                <Canvas height={400} width={400} firstBlockDate={firstBlockDate} />
                                <figcaption>Mint Price:<span className="text-highlight"> ETH 0.1</span></figcaption>
                            </figure>
                        </>
                    )}

                </Card>
            </div>
        </div>
    )
}
