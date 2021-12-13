import React from 'react';
import TwitLogo from '../static/twitter-logo.svg';
import DiscLogo from '../static/Discord-Logo-Black.svg';
import styled from 'styled-components';

const TwitterLogo = styled.img.attrs({
    src: TwitLogo,
})`
  height: 20px;
`;

const DiscordLogo = styled.img.attrs({
    src: DiscLogo,
})`
  height: 20px;
`;



export default function Footer() {
    return (
        <div className="footer">
            <div className="footer-container">
                <p>&copy; 2021</p>
                <a href="https://twitter.com/onchainOG" target="_blank" rel="noreferrer noopener"><TwitterLogo /></a>
                <a href="https://discord.gg/3ZBawXUUsu" target="_blank" rel="noreferrer noopener"><DiscordLogo /></a>
            </div>
        </div >
    )
}
