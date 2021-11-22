import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';

const useAddress = () => {
    const { account, active } = useWeb3React();
    const [firstBlockNumber, setFirstBlockNumber] = useState("");
    const [firstBlockDate, setfirstBlockDate] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [firstYear, setFirstYear] = useState(2021);

    //create Etherscan api URL
    //mainnet
    //const API_BASE_URL = 'https://api.etherscan.io/api?module=account&action=txlist&address=';

    //Rinkeby
    const RINKEBY_API_BASE_URL = 'https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=';

    const API_SECONADRY_BASE_URL = '&startblock=0&endblock=99999999&page=1&offset=1&sort=asc&apikey=';

    const etherscanURL =
        RINKEBY_API_BASE_URL + account + API_SECONADRY_BASE_URL +
        process.env.REACT_APP_ETHERSCAN_API_KEY;


    function getFirstYear(blockNumber) {

        //mainnet
        // if (blockNumber < 778483) {
        //     setFirstYear(2015);
        // }
        // else if (blockNumber < 2912407) {
        //     setFirstYear(2016);
        // }
        // else if (blockNumber < 4832686) {
        //     setFirstYear(2017);
        // }
        // else if (blockNumber < 6988615) {
        //     setFirstYear(2018);
        // }
        // else if (blockNumber < 9193266) {
        //     setFirstYear(2019);
        // }
        // else if (blockNumber < 11565019) {
        //     setFirstYear(2020);
        // }
        // else {
        //     setFirstYear(2021);
        // }

        //Rinkeby
        if (blockNumber < 1513019) {
            setFirstYear(2017);
        }
        else if (blockNumber < 3611463) {
            setFirstYear(2018);
        }
        else if (blockNumber < 5713163) {
            setFirstYear(2019);
        }
        else if (blockNumber < 7815452) {
            setFirstYear(2020);
        }
        else {
            setFirstYear(2021);
        }
    }

    async function fetchFirstBlock(API_URL) {
        setIsError(false); //reset error status

        if (active) {
            setIsLoading(true);
        }


        try {
            const response = await fetch(API_URL);
            const firstTransaction = await response.json();
            const firstBlock = firstTransaction.result[0].blockNumber;
            setFirstBlockNumber(firstBlock);
            getFirstYear(parseFloat(firstBlock));

            //get date of transaction
            const dateObj = new Date((firstTransaction.result[0].timeStamp) * 1000);
            const humanDate = dateObj.toDateString();
            setfirstBlockDate(humanDate);

            if (firstBlockNumber !== "" && firstBlockDate !== "" && active && !isError) {
                setIsDataLoaded(true);
                setIsLoading(false);
            }
        }
        catch (err) {
            setIsError(true);
            console.log(err)
        };
    }

    //call Etherscan API
    useEffect(() => {
        fetchFirstBlock(etherscanURL)
    }, [etherscanURL])


    return { firstBlockNumber, firstBlockDate, isError, isLoading, isDataLoaded, firstYear };
};

export default useAddress;
