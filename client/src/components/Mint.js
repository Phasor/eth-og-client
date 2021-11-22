import React, { useState, useEffect } from 'react';
import useUploader from '../hooks/useUploader';
import useContract from '../hooks/useContract';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import ABI from '../abi';

export default function Mint({ finalImage, firstYear }) {
    const { account, active } = useWeb3React();
    const { uploadMetaData } = useUploader();
    const ContractAddress = '0x5560ECeDd9F72f5b74BaAE7A4edE487579f216cA'; // Rinkeby
    const mintContract = useContract(ContractAddress, ABI);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [currentSupply, setCurrentSupply] = useState(0);
    const [txHash, setTxHash] = useState('');

    const etherScanBase = 'https://rinkeby.etherscan.io/tx/'

    useEffect(() => {
        //get current total supply
        async function fetchSupply() {
            const currentSupply = await mintContract.totalSupply();
            setCurrentSupply(currentSupply.toNumber());
        }
        fetchSupply();
    }, [mintContract])

    async function Mint() {
        try {
            //set loading
            setIsLoading(true);
            setSuccess(false);

            //get latest supply data
            const currentSupplyBN = await mintContract.totalSupply();
            const currentSupply = currentSupplyBN.toNumber();

            //register transfer event from smart contract
            mintContract.on("Transfer", (from, to, tokenID) => {
                setIsLoading(false);
                setSuccess(true);
            })

            //upload the metadata to IPFS
            const url = await uploadMetaData(
                `#${currentSupply + 1}`,
                'A cool description of this item',
                finalImage,
                [
                    {
                        "trait_type": "Year",
                        "value": firstYear
                    }
                ],
            );

            //get the contract owner address
            const owner = await mintContract.owner();

            //mint the NFT
            if (owner === account) {
                const tx = await mintContract.mint(account, 1, url); //free mint for owner
                setTxHash(tx.hash);
            }
            else { // have to pay the mint fee
                const tx = await mintContract.mint(account, 1, url, { value: ethers.utils.parseEther("0.05") });
                setTxHash(tx.hash);
            }

        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="mint-section">
            <button onClick={Mint}>Mint</button>
            <div className="mint-section__content">
                {active && <p>Total Minted: <span className="text-highlight"> {currentSupply}</span></p>}
                {isLoading && <p>Minting, please hang tight...</p>}
                {success && <p>Successfully minted!</p>}
                {success && <a href={etherScanBase + txHash} target="_blank" rel="noreferrer">View on EtherScan</a>}
            </div>
        </div>
    )
}
