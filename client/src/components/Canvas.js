
import Mint from './Mint';

export default function Canvas({ finalImage, metaDataUrl, signature }) {

    //convert image buffer to base64 string
    const base64String = btoa(String.fromCharCode(...new Uint8Array(finalImage)));

    return (
        <div className="canvas-section">
            <img src={`data:image/png;base64,${base64String}`} alt="NFT preview" />
            <Mint metaDataUrl={metaDataUrl} signature={signature} />
        </div>
    )
}


