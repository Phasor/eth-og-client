# Getting Started with ETH OG

This is an NFT project where users can mint an NFT that proves when they first interacted with the Ethereum blockchain.

The project will mint an NFT with the date you first interacted with Ethereum Rinkeby test net with the connected wallet address via Metamask.



A screencast of the dApp is available at: [URL]

## Directory Structure

This app uses [React](https://reactjs.org/) and [Truffle Suite](https://trufflesuite.com/).

The truffle smart contract side of the project is located at the project root directoty. The React app is located in the Client folder. Two package.json files and two .env files exist, one for the truffle back end, and one for the front end React app.

This repo contains all the code to re-deploy the smart contract (NFT.sol) as the owner and to create your own version of the front end dapp.


## React App Instructions

1. Clone the code locally: 

`git clone https://github.com/Phasor/blockchain-developer-bootcamp-final-project.git`

2. Ensure you have node.js installed

3. Change into the app `client` directory and install React app dependencies locally with:

`cd client`

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

## Front End Dapp

The website to mint your NFT using the currently deployed version of the app's NFT.sol contract can be located at https://www.[TEST].com.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
