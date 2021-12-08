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
                <p>&copy; 2021  <span className="twitter-logo"><TwitterLogo /></span>
                    <a href="https://twitter.com/investingtribe" target="_blank" rel="noreferrer noopener">@investingtribe</a></p>
            </div>
        </div >
    )
}
