# Getting Started with ETH OG

This is an NFT project where users can mint an NFT that proves when they first interacted with Ethereum.

The project will mint an NFT with the date you first interacted with Ethereum Rinkeby test net with the connected wallet address via Metamask.

This repo contains all the code to re-deploy the smart contract (NFT.sol) as the owner and to create your own version of the front end dapp.

A screencast of the dApp is available at: [URL]

## React App Instructions

1. Clone the code locally: 

`git clone https://github.com/Phasor/blockchain-developer-bootcamp-final-project.git`

2. Ensure you have node.js installed

3. Install dependencies locally with:

`npm install`

4. Populate the values in `.env.sample` and rename the file `.env`. NB: only the NFT Storage and etherscan api keys are needed if you wish to use the existing deployed version of NFT.sol. If you wish to update that, the infura key and mnemonic will need to be populated too.

5. To start the front end React App in development mode, use:

`npm run start`

## Smart Contract

Truffle has been used to test and deploy the smart contracts. If you wish to deploy updated versions:
1. Update the contract, NFT.sol and any migrations required
2. Populate the `.env` file with all values to ensure you can connect to your ethereum node and sign the contract creation transaction
3. Ensure the network section of `truffle-config.js` is populated
4. Test the contract with `truffle test`. Testing on the development network is set to run on port 8545
5. Deploy the contract with `truffle migrate`
6. Update references to the ABI in `SRC/abi.js` and the smart contract address in `SRC/Components/Mint.js`

## Directory Structure

This app uses [React](https://reactjs.org/) and [Truffle Suite](https://trufflesuite.com/).

As such, the main files for the React front end app are located in `/SRC`. The main directories/files for the Ethereum/truffle interaction are Contracts, Migrations and truffle-config.js.

## Front End Dapp

The website to mint your NFT using the currently deployed version of the app's NFT.sol contract can be located at https://www.[TEST].com.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
