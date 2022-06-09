import React , { useEffect ,  useState} from "react";
import { ethers } from "ethers";
import { contractAddress, contractABI } from "../utils/constant";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.web3provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log({
        provider,
        signer,
        transactionContract
    })
}

export const TransactionProvider = ({children}) => {
    return(
        <TransactionContext.Provider value = {{value:"test"}}>
            {children}
        </TransactionContext.Provider>
    );

}