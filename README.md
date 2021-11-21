# Getting Started with ETH OG

This is an NFT project where users can mint an NFT that proves when they first interacted with Ethereum.

The project will mint an NFT with the date you first interacted with Ethereum main net with the connected wallet address via Metamask.

This repo contains all the code to redeploy the smart contract (NFT.sol) as the owner and to create your own version of the front end dapp.

## React App Instructions

1. Clone the code locally `git clone [URL]`
2. Ensure you have node.js installed
3. Install dependencies locally with `npm install`
4. Populate the values in `.env.sample` and rename the file `.env`. NB: only the NFT Storage and etherscan api keys are needed if you wish to use the existing deployed version of NFT.sol. If you wish to update that, the infura key and mnemonic will need to be populated too.
5. To start the front end React App in development mode, use `npm start`.

## Smart Contract

Truffle has been used to test and deploy the smart contracts. If you wish to deploy updated versions:
1.Update the contract, NFT.sol and any migrations required
2.Populate the `.env` file with all values to ensure you can connect to your ethereum node and sign the contract creation transaction
3.Ensure the network section of `truffle-config.js` is populated
4.Test the contract with `truffle test`. Testing on the development network is set to run on port 8545
5.Deploy the contract with `truffle migrate`

## Directory Structure

This app uses [React](https://reactjs.org/) and [Truffle Suite](https://trufflesuite.com/).

As such, the main files for the React front end app are located in SRC and Public. The main directories/files for the Ethereum/truffle interaction are Contracts, Migrations and truffle-config.js.

## Front End Dapp

The website to mint your NFT using the currently deployed version of the app's NFT.sol contract can be located at https://www.[TEST].com.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
