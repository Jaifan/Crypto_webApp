import React , { useEffect ,  useState} from "react";
import { ethers } from "ethers";
import { contractAddress, contractABI } from "../utils/constant";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log({
        provider,
        signer,
        transactionsContract
    })

    return transactionsContract;
}

export const TransactionProvider = ({children}) => {

    const [currentAccount , setCurrentAccount] = useState();
    const [formData , setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: ''});
    const [isloading , setIsloading] = useState(false);
    const [transactionCount , setTransactionCount] = useState(localStorage.getItem("transactiocount"));
    const [transactions, setTransactions] = useState([]);
    const [trans, setTrans] = useState([]);


    const handleChange = (e, name)=> {
        setFormData((prevState)=>({ ...prevState, [name]:e.target.value}));
    }

    const getAllTransactions = async () => {
        try {
          if (ethereum) {
            const transactionsContract = getEthereumContract();
    
            const availableTransactions = await transactionsContract.getAllTransactions();
            const structuredTransactions = availableTransactions.map((transaction,i) => ({
                id: i,
              addressTo: transaction.receiver,
              addressFrom: transaction.sender,
              timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
              message: transaction.message,
              keyword: transaction.keyword,
              amount: parseInt(transaction.amount._hex) / (10 ** 18),
            }));
            
            setTransactions(structuredTransactions);
            trans.push(structuredTransactions);

            console.log(trans[0]);

          } else {
            console.log("Ethereum is not present");
          }
        } catch (error) {
          console.log(error);
        }
      };

    const IswalletConnected = async ()=> {
    
    try {
        if(!ethereum) return ("Please Install MetaMask");
        const accounts = await ethereum.request({method : "eth_accounts"});

        if(accounts.length){
            setCurrentAccount(accounts[0]);
            getAllTransactions();

        } else {
            console.log("No accounts!");
        }
        
    } catch (error) {
        console.log(error);
    }
    }

    const checkIfTransactionsExists = async () => {
        try {
          if (ethereum) {
            const transactionsContract = getEthereumContract();
            const currentTransactionCount = await transactionsContract.getTransactionCount();
    
            window.localStorage.setItem("transactionCount", currentTransactionCount);
          }
        } catch (error) {
          console.log(error);
    
          throw new Error("No ethereum object");
        }
      };

    const connectWallet = async () => {
        try {
            if(!ethereum) return ("Please Install MetaMask");
            const accounts = await ethereum.request({method : "eth_requestAccounts"});

            setCurrentAccount(accounts[0]);
            
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object.");
        }


    }

    const sendTransaction = async ()=> {
        try {
            if(!ethereum) return ("Please Install MetaMask");

            const {addressTo, amount , keyword , message} = formData;

            const transactionsContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            console.log(`Currenttt : ${currentAccount}`);
            

            await ethereum.request({
                method : 'eth_sendTransaction',
                params : [{
                    from : currentAccount,
                    to : addressTo,
                    gas : '0x5208',
                    value : parsedAmount._hex, 
                }],
            });
            console.log(`Currenttt : ${currentAccount}`);
            const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message , keyword);
            
            setIsloading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait()

            setIsloading(false);
            console.log(`Successfull - ${transactionHash.hash}`);

            const transactionCount = await transactionsContract.getTransactionCount();

            setTransactionCount(transactionCount.toNumber());
            window.location.reload();


        } catch (error) {
            throw new Error("No ethereum Object!!");
        }
    }

    useEffect(()=> {
        IswalletConnected();
        checkIfTransactionsExists();
    },[transactionCount]);


    return(
        <TransactionContext.Provider value = {{ 
            connectWallet, 
            currentAccount,
            formData, 
            sendTransaction,
            handleChange,
            transactions,
            trans,
            isloading
        }}>

            {children}
        </TransactionContext.Provider>
    );

}