import React from 'react';
import TwitLogo from '../static/twitter-logo.svg';
import styled from 'styled-components';

const TwitterLogo = styled.img.attrs({
    src: TwitLogo,
})`
  height: 20px;
`;

export default function Footer() {
    return (
        <div className="footer">
            <div className="footer-container">
                <p>Copyright 2021  <span className="twitter-logo"><TwitterLogo /></span>@investingtribe</p>
            </div>
        </div >
    )
}
