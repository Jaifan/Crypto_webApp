import React, {useContext, useState} from "react";
import {TransactionContext} from "../context/TransactionContext";
import useFetch from "../hooks/useFatch"

import dummyData from "../utils/dummyData"

const TransactionCard = ({ addressTo, addressFrom, timestamp, message, keyword, amount, url })=> {

  const gifurl = useFetch({keyword});

  return (
    <div className="bg-[#181918] m-4 flex flex-1
    2xl:min-w-[450px]
    2xl:max-w-[500px]
    sm:min-w-[270px]
    sm:max-w-[300px]
    min-w-full
    flex-col p-3 rounded-md hover:shadow-2xl"
  >
    <div className="flex flex-col items-center w-full mt-3">
      <div className="display-flex justify-start w-full mb-6 p-2">
        <a href={`https://rinkeby.etherscan.io/address/${addressFrom}`} target="_blank" rel="noreferrer">
          <p className="text-white text-base">From: {`${addressFrom.slice(0,5)}.....${addressFrom.slice(addressFrom.length-5)}` }</p>
        </a>
        <a href={`https://rinkeby.etherscan.io/address/${addressTo}`} target="_blank" rel="noreferrer">
          <p className="text-white text-base">To: {`${addressTo.slice(0,5)}.....${addressTo.slice(addressTo.length-5)}` }</p>
        </a>
        <p className="text-white text-base">Amount: {amount} ETH</p>
        {message && (
          <>
            <br />
            <p className="text-white text-base">Message: {message}</p>
          </>
        )}
      </div>
      <img
          src={gifurl || url}
          alt="nature"
          className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
        />
      <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
        <p className="text-[#37c7da] font-bold">{timestamp}</p>
      </div>
    </div>
  </div>
  );
}


const Transaction = () => {
  const {currentAccount , trans} = useContext(TransactionContext);

  const obj = JSON.stringify(trans);
  console.log(obj);

  
  const history = (a) =>
        trans.map((transaction, i)=> (
        <TransactionCard key={i} {...transaction[a]} /> 
      ))
    


  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 bg-gradient-to-r from-green-400 to-blue-500">
      
      <div className="flex flex-col md:p-12 py-12 px-4">
        { currentAccount ? (
            <h3 className="text-white text-3xl text-center my-2">Latest Transactions</h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-2">Connect Wallet to see latest transactions</h3>
        )}

        <div className="flex flex-wrap justify-center items-center mt-10">
            {currentAccount && history(0)}
            {currentAccount && history(1)}
            {currentAccount && history(2)}
        </div>
      </div>
    </div>
  )
}

export default Transaction