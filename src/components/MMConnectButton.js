import React from 'react'
import { useWeb3React } from '@web3-react/core';
import MMLogo from '../static/metamask-logo.svg';
import { injected } from '../connectors';
import { shortenAddress } from '../utils/shortenAddress';
import styled from 'styled-components';
import Card from './Card';

const MetamaskLogo = styled.img.attrs({
    src: MMLogo,
})`
  height: 40px;
`;

const MMConnectButton = (props) => {
    const { activate, active, account, deactivate } = useWeb3React();

    if (active) {
        return (
            <div className='MM-button-container'>
                <Card>
                    <div className="MM-button-items">
                        <div className="MM-button__logo-and-address">
                            <MetamaskLogo className="mm-button__logo" />
                            <span className="address-text mm-button__title">{shortenAddress(account)}</span>
                        </div>
                        <button
                            className='MM-Button-container__button'
                            onClick={deactivate}
                        >
                            Log Out
                        </button>
                    </div >
                </Card >
            </div >
        );
    }

    return (
        <div className='MM-button-container'>
            <Card>
                <div className="MM-button-items">
                    <div className="MM-button__logo-and-address">
                        <MetamaskLogo className="mm-button__logo" />
                        <span className="mm-button__title">Metamask</span>
                    </div>
                    <button
                        className='MM-Button-container__button'
                        onClick={() => {
                            activate(injected)
                        }}
                    >
                        Connect
                    </button>
                </div >
            </Card >
        </div >
    );
};

export default MMConnectButton;
