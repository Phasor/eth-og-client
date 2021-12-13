import React from 'react'

export default function FAQ() {
    return (
        <div className="FAQ-container">
            <div className="FAQ-container__text">
                <h5>FAQ</h5>
                <ol>
                    <li>I don't get it? How does this work?</li>
                    <br />
                    <p>Connect your MetaMask wallet to the dapp using the Ethereum network. We will query your wallet address to lookup the first transaction from your wallet on the Ethereum main network.</p>
                    <p>You will be able to mint an NFT in accordance with how long ago your first transaction was. Those who transacted in 2015 will be able to mint a different NFT to those who transacted in 2016.</p>
                    <li>What chain is this project on?</li>
                    <br />
                    <p>Ethereum.</p>
                    <li>Is there any utility?</li>
                    <br />
                    <p>After 1,000 mints have been sold, we will commit to providing 3d metaverse-ready models of each item so that your avatar can flex your Eth OG status in the metaverse (Sandbox, Cryptovoxels)! </p>

                    <li>How can I contact you?</li>
                    <br />
                    <p><a href="https://twitter.com/onchainOG" target="_blank" rel="noreferrer noopener">Twitter</a></p>
                    <p><a href="https://discord.gg/3ZBawXUUsu" target="_blank" rel="noreferrer noopener">Discord</a></p>
                    <li>Is there a members discord channel?</li>
                    <br />
                    <p>Members will be able to verify that they hold an Eth OG NFT on discord and get exclusive access to the OG lounge. </p>
                    <li>How much do they cost to mint?</li>
                    <br />
                    <p>There is an initial introductory price of ETH 0.05 per NFT. The price will increase to 0.1 Eth after an undisclosed time. </p>
                </ol>
            </div>
        </div >
    )
}
