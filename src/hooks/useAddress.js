import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';

const useAddress = () => {
    const { account, active } = useWeb3React();
    const [firstBlockNumber, setFirstBlockNumber] = useState("");
    const [firstBlockDate, setfirstBlockDate] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    //create Etherscan api URL
    //mainnet
    //const API_BASE_URL = 'https://api.etherscan.io/api?module=account&action=txlist&address=';

    //Rinkeby
    const RINKEBY_API_BASE_URL = 'https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=';

    const API_SECONADRY_BASE_URL = '&startblock=0&endblock=99999999&page=1&offset=1&sort=asc&apikey=';

    const etherscanURL =
        RINKEBY_API_BASE_URL + account + API_SECONADRY_BASE_URL +
        process.env.REACT_APP_ETHERSCAN_API_KEY;

    async function fetchFirstBlock(API_URL) {
        setIsError(false); //reset error status

        if (active) {
            setIsLoading(true);
        }


        try {
            const response = await fetch(API_URL);
            const firstTransaction = await response.json();
            //console.log(firstTransaction)
            const firstBlock = firstTransaction.result[0].blockNumber;
            //console.log(typeof firstBlock);
            setFirstBlockNumber(firstBlock);
            setIsLoading(false);

            //get date of transaction
            const dateObj = new Date((firstTransaction.result[0].timeStamp) * 1000);
            const humanDate = dateObj.toDateString();
            setfirstBlockDate(humanDate);

            if (firstBlockNumber !== "" && firstBlockDate !== "" && active && !isError) {
                setIsDataLoaded(true);
            }
        }
        catch (err) {
            setIsError(true);
            console.log(err)
        };
    }

    //call Etherscan API
    useEffect(() => {
        //call etherscan API
        //console.log(etherscanURL);
        fetchFirstBlock(etherscanURL)
    }, [etherscanURL])


    return { firstBlockNumber, firstBlockDate, isError, isLoading, isDataLoaded };

};

export default useAddress;
