import '../css/App.css';
import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './Nav';
import Main from './Main';
import Footer from './Footer';

//pull in .env variables
require('dotenv').config();
//console.log(process.env.REACT_APP_INFURA_API_KEY);
//console.log(process.env.REACT_APP_MNEMONIC);

function getLibrary(provider) {
  return new ethers.providers.Web3Provider(provider);
}

function App() {

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className="App">
        <Nav />
        <Main />
        <Footer />
      </div>
    </Web3ReactProvider >
  );
}

export default App;
