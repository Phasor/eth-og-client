import '../css/App.css';
import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './Nav';
import Main from './Main';
import Footer from './Footer';
import Intro from './Intro';
import FAQ from './FAQ';

//pull in .env variables
require('dotenv').config();

function getLibrary(provider) {
  return new ethers.providers.Web3Provider(provider);
}

function App() {

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className="App">
        <Nav />
        <Intro />
        <Main />
        <FAQ />
        <Footer />
      </div>
    </Web3ReactProvider >
  );
}

export default App;
