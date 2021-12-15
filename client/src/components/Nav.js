import React from 'react'
import MMConnectButton from './MMConnectButton';
import sunglass from '../static/sunglasses.png';
import eyes from '../static/Eyes.png';
import styled from 'styled-components';

const Sunglasses = styled.img.attrs({
    src: sunglass,
})`
  height: 125px;
`;

const EyesImg = styled.img.attrs({
    src: eyes,
})`
  height: 80px;
`;

export default function Nav(props) {

    return (
        <div className="nav">
            <div className="nav-container">
                <div className="nav-images">
                    <Sunglasses />
                    <EyesImg className="nav-images__eyes" />
                </div>
                <MMConnectButton />
            </div>
        </div>
    )
}
