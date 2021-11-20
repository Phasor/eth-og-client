import React, { useState, useEffect } from 'react';
import useUploader from '../hooks/useUploader';
import useContract from '../hooks/useContract';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import ABI from '../abi';

export default function Mint({ finalImage, firstYear }) {
    const { account, active } = useWeb3React();
    const { uploadMetaData } = useUploader();
    //const ContractAddress = '0x429Fb81c6Eb449303da7a51fbE077B4859eAf41a'; // Rinkeby
    const ContractAddress = '0xf4334E805236f17E5bE81911B9a587F7A2E75891'; // Rinkeby
    const mintContract = useContract(ContractAddress, ABI);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [currentSupply, setCurrentSupply] = useState(0);

    useEffect(() => {
        //get current total supply
        async function fetchSupply() {
            const currentSupply = await mintContract.totalSupply();
            setCurrentSupply(currentSupply.toNumber());
        }
        fetchSupply();
    }, [])

    async function Mint() {
        try {
            //set loading
            setIsLoading(true);
            setSuccess(false);

            //get latest supply data
            const currentSupplyBN = await mintContract.totalSupply();
            const currentSupply = currentSupplyBN.toNumber();
            //console.log(currentSupply);
            //const mintCostBN = await mintContract.cost();
            //setMintCostReadable(ethers.utils.formatEther(mintCostBN)); //in ether
            //console.log(mintCostBN);

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
                await mintContract.mint(account, 1, url); //free mint for owner
            }
            else { // have to pay the mint fee
                await mintContract.mint(account, 1, url, { value: ethers.utils.parseEther("0.05") });
            }

        }
        catch (error) {
            console.log(error);
        }
    }

    async function Withdraw() {
        try {
            await mintContract.withdraw();
        }
        catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="mint-section">
            <button
                onClick={Mint}
            >
                Mint
            </button>

            <button
                onClick={Withdraw}
            >
                Withdraw
            </button>

            {active && <p>Total Minted: {currentSupply}</p>}
            {isLoading && <p>Minting, hang tight...</p>}
            {success && <p>Successfully minted! Wh()()t!</p>}
        </div>
    )
}
