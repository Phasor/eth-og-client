import React from 'react';
import useUploader from '../hooks/useUploader';

export default function Mint({ finalImage }) {

    const { uploadMetaData } = useUploader();

    return (
        <div className="mint-section">
            <button
                onClick={() => uploadMetaData('TestImage', 'A cool description', finalImage)}
            >
                Mint
            </button>
        </div>
    )
}
