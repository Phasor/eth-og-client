import React from 'react'
import { useEffect, useRef, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import baseImage from '../static/base.jpg';
import Mint from './Mint';

export default function Canvas({ width, height, firstBlockDate, firstYear }) {
    const myCanvas = useRef();
    const { account } = useWeb3React();
    const [finalImage, setfinalImage] = useState(null);

    useEffect(() => {
        const context = myCanvas.current.getContext('2d');
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.src = baseImage;

        //draw date && address over the top of base image
        image.onload = () => {
            context.drawImage(image, 0, 0, width, height);
            context.fillStyle = '#b0b0b0';
            context.font = '50px Arial';
            context.textAlign = 'center';
            context.fillText(firstBlockDate, width / 2, height / 1.15);
            context.font = '16px Arial';
            context.fillText(account, width / 2, height / 1.05);

            //save image by converting to blob
            myCanvas.current.toBlob(function (blob) {
                setfinalImage(blob);
            })
        }
    }, [width, height, firstBlockDate, account]);


    return (
        <div className="canvas-section">
            <canvas
                ref={myCanvas}
                width={width}
                height={height}
            />
            <Mint finalImage={finalImage} firstYear={firstYear} />
        </div>

    )
}
