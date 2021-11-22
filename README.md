# Getting Started with ETH OG

This is an NFT project where users can mint an NFT that proves when they first interacted with the Ethereum blockchain.

The project will mint an NFT with the date you first interacted with Ethereum Rinkeby test net with the connected wallet address via Metamask. Off-chain art and metadata are hosted on IPFS.

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

4. Populate the values in `client/.env.sample` and rename the file `.env`. 

You will need an API key from [NFT.storage](https://nft.storage/) to upload to IPFS.

You will need an API key from [Etherscan](https://etherscan.io/apis) to get details about the connected Ethereum address.

NB: only the NFT Storage and Etherscan api keys are needed if you wish to use the existing deployed version of NFT.sol. If you wish to update the smart contract and interact with that, please update the truffle orientated .env at the project root level too.

5. Make sure you are in the `client` folder, then run the app locally:

`npm run start`

## Smart Contract

Truffle has been used to test and deploy the smart contracts. 

If you wish to deploy updated versions of the smart contract, you will need to install truffle and other dependencies, seperate to those above installed as part of the React app. Truffle dependencies are located in the root project directory `/package.json`.

1. In the project root folder (not in /client):

`npm install`

2. Update the contract, NFT.sol and any migrations required

3. Populate the values in `.env.sample` file at the project root level and rename the file `.env`. 

4. Ensure the network section of `truffle-config.js` is populated with the relevalnt network you wish to deploy to. By default the project uses Rinkeby test net.

5. Test the contract with truffle.

Install a local test chain like Ganache:

`npm install ganache-cli`

Run the local development blockchain:

`ganache-cli`

Run the tests:

 `truffle test`. 

Testing on the development network is set to run on port 8545.

6. Deploy the new contract (change the network as desired):

 `truffle migrate --network rinkeby`

7. Update references to the ABI in `client/SRC/abi.js` and the smart contract address in `client/SRC/Components/Mint.js`.

## Deployed Front End

The React front end app located in `/client` has already been deployed publically and can be located at https://www.[TEST].com.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
