import React, { useState, useEffect } from 'react';
import useContract from '../hooks/useContract';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import ABI from '../abi';

export default function Mint({ metaDataUrl, signature, firstYear }) {
    const { account, active } = useWeb3React();
    const ContractAddress = '0x41ee3B75B5fc655e64Ed95C18366BcbDE78E15B2'; // Rinkeby
    const mintContract = useContract(ContractAddress, ABI);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [currentSupply, setCurrentSupply] = useState(0);
    const [txHash, setTxHash] = useState('');
    const [errorStatus, setErrorStatus] = useState(false);
    const [txError, setTxError] = useState('');


    const etherScanBase = 'https://rinkeby.etherscan.io/tx/'

    useEffect(() => {
        //get current total supply
        async function fetchSupply() {
            const currentSupply = await mintContract.totalSupply();
            setCurrentSupply(currentSupply.toNumber());
        }
        fetchSupply();
    }, [mintContract])

    async function MintNFT() {
        try {
            setIsLoading(true);
            //register transfer event from smart contract
            mintContract.on("Transfer", (from, to, tokenID) => {
                setSuccess(true);
                setIsLoading(false);
            })

            //get the contract owner address
            const owner = await mintContract.owner();

            //mint the NFT
            if (owner === account) {
                const tx = await mintContract.mint(account, 1, metaDataUrl, signature, firstYear); //free mint for owner
                setTxHash(tx.hash);
            }
            else { // have to pay the mint fee
                const tx = await mintContract.mint(account, 1, metaDataUrl, signature, firstYear, { value: ethers.utils.parseEther("0.05") });
                setTxHash(tx.hash);
            }

        }
        catch (error) {
            console.log(error);
            setErrorStatus(true);
            setTxError(error);
        }
    }

    return (
        <div className="mint-section">
            <button onClick={MintNFT}>Mint Now!</button>
            <div className="mint-section__content">
                {active && <p>Total Minted: <span className="text-highlight"> {currentSupply}</span></p>}
                {isLoading && <p>Please confirm and hang tight...</p>}
                {success && <p>Successfully minted!</p>}
                {success && <a href={etherScanBase + txHash} target="_blank" rel="noreferrer">View on EtherScan</a>}
                {errorStatus && <p>{txError}</p>}
            </div>
        </div>
    )
}
