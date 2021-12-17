import React, { useState, useEffect } from 'react';
import useContract from '../hooks/useContract';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import ABI from '../abi';

export default function Mint({ signature, apiMessage }) {
    const { account, active } = useWeb3React();
    const ContractAddress = '0x1240c96D19F298B8B75A06471C03539Aef0Eba77'; // Rinkeby
    const mintContract = useContract(ContractAddress, ABI);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [currentSupply, setCurrentSupply] = useState(0);
    const [txHash, setTxHash] = useState('');
    const [errorStatus, setErrorStatus] = useState(false);
    const [txError, setTxError] = useState('');
    const [supply2015, setSupply2015] = useState(0);
    const [supply2016, setSupply2016] = useState(0);
    const [supply2017, setSupply2017] = useState(0);
    const [supply2018, setSupply2018] = useState(0);
    const [supply2019, setSupply2019] = useState(0);
    const [supply2020, setSupply2020] = useState(0);
    const [supply2021, setSupply2021] = useState(0);


    const etherScanBase = 'https://rinkeby.etherscan.io/tx/'

    useEffect(() => {
        //get current total supply
        async function fetchSupply() {
            const currentSupply = await mintContract.totalSupply();
            setCurrentSupply(currentSupply.toNumber());
            const currentSupply2015 = await mintContract.mintedByVintage('2015');
            setSupply2015(currentSupply2015.toNumber());
            const currentSupply2016 = await mintContract.mintedByVintage('2016');
            setSupply2016(currentSupply2016.toNumber());
            const currentSupply2017 = await mintContract.mintedByVintage('2017');
            setSupply2017(currentSupply2017.toNumber());
            const currentSupply2018 = await mintContract.mintedByVintage('2018');
            setSupply2018(currentSupply2018.toNumber());
            const currentSupply2019 = await mintContract.mintedByVintage('2019');
            setSupply2019(currentSupply2019.toNumber());
            const currentSupply2020 = await mintContract.mintedByVintage('2020');
            setSupply2020(currentSupply2020.toNumber());
            const currentSupply2021 = await mintContract.mintedByVintage('2021');
            setSupply2021(currentSupply2021.toNumber());
        }
        fetchSupply();
    }, [mintContract])

    async function MintNFT() {
        try {
            setIsLoading(true);

            //register transfer event from smart contract
            mintContract.removeAllListeners();
            mintContract.on("Transfer", () => {
                setSuccess(true);
                setIsLoading(false);
            })

            //get the contract owner address
            const owner = await mintContract.owner();

            //mint the NFT
            if (owner === account) {
                const tx = await mintContract.mint(account, 1, apiMessage, signature); //free mint for owner
                setTxHash(tx.hash);
            }
            else { // have to pay the mint fee
                const tx = await mintContract.mint(account, 1, apiMessage, signature, { value: ethers.utils.parseEther("0.05") });
                setTxHash(tx.hash);
            }

        }
        catch (error) {
            console.log(error);
            setErrorStatus(true);
            setTxError("failed to mint");
        }
    }

    return (
        <div className="mint-section">
            <button onClick={MintNFT}>Mint Now!</button>
            <div className="mint-section__content">
                {active && <p>Total Minted: <span className="text-highlight"> {currentSupply}</span></p>}
                {active && <p>2015 OG's: <span className="text-highlight"> {supply2015}/2000</span></p>}
                {active && <p>2016 OG's: <span className="text-highlight"> {supply2016}/2000</span></p>}
                {active && <p>2017 OG's: <span className="text-highlight"> {supply2017}/2000</span></p>}
                {active && <p>2018 OG's: <span className="text-highlight"> {supply2018}/2000</span></p>}
                {active && <p>2019 OG's: <span className="text-highlight"> {supply2019}/2000</span></p>}
                {active && <p>2020 OG's: <span className="text-highlight"> {supply2020}/2000</span></p>}
                {active && <p>2021 OG's: <span className="text-highlight"> {supply2021}/2000</span></p>}
                {isLoading && <p>Please confirm and hang tight...</p>}
                {success && <p>Successfully minted!</p>}
                {success && <a href={etherScanBase + txHash} target="_blank" rel="noreferrer">View on EtherScan</a>}
                {errorStatus && <p>{txError}</p>}
            </div>
        </div>
    )
}
