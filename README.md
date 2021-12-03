# Getting Started with ETH OG

This is an NFT project where users can mint an NFT that proves when they first interacted with the Ethereum Rinkeby test blockchain.

The project will mint an NFT with the date you first interacted with Ethereum Rinkeby test net with the connected wallet address via Metamask. Off-chain art and metadata are hosted on IPFS.

- [Deployed front end](https://fervent-carson-b164f3.netlify.app) 
- [Rinkeby Faucet](https://faucets.chain.link/rinkeby)
- [Screencast](https://www.loom.com/share/80afd3ba480c4ad48dbd9f5a3bdacff2)
- Eth main net Address for certificate/donations: 0xdD2D7ACBA5DB7A368773E073bd0129fc01956Ca3


## Directory Structure and Architecture 

This app uses [React](https://reactjs.org/) to manage the front end UI and [Truffle Suite](https://trufflesuite.com/) to manage the smart contracts and blockchain communication.

The truffle smart contract side of the project is located at the project root directoty. The React app is located in the Client folder. Two package.json files and two .env files exist, one for the truffle back end, and one for the front end React app.

In addition, the app uses the Etherscan API to fetch the first date a user interacted with Ethereum with the connected wallet. It then creates the NFT using HTML 5 Canvas and then uses NFT.storage API to upload the metadata and image to IPFS where it can be retrieved by Opensea/other NFT platforms for displaying in a user's profile.


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


## Smart Contract Management

Truffle has been used to test and deploy the smart contracts. 

If you do not have truffle installed:

`npm install -g truffle`


### Smart Contract Testing

To test the current version of the smart contract NFT.sol:

1. In the project root folder (not in /client):

`npm install`

2. Install a local test chain like Ganache:

`npm install -g ganache-cli`

3. Run Ganache:

`ganache-cli`

4. Run the smart contract tests locally (port 8545):

`truffle test `


### Update Smart Contract

If you wish to alter and/or redeploy the smart contract to local/public network:

1. Populate the values in `.env.sample` file at the project root level and rename the file `.env`. 

2. Deploy the new contract (change the network as desired):

 `truffle migrate --network rinkeby`

3. Update references to the smart contract in the front end React app. Update the ABI in `client/SRC/abi.js` and the smart contract address in `client/SRC/Components/Mint.js`.


## Deployed Front End and Contract

The React front end app located in `/client` has already been deployed publically and can be located [here](https://fervent-carson-b164f3.netlify.app/)

Link to deployed [Rinkeby Smart Contract](https://rinkeby.etherscan.io/address/0x5560ecedd9f72f5b74baae7a4ede487579f216ca)


