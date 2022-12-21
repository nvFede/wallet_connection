import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

export const WalletContext = React.createContext();
``
export const WalletProvider = ({ children }) => {
  
  const [errorMessage, setErrorMessage] = useState('');
  const [defaultAccount, setDefaultAccount] = useState('');
  const [userBalance, setUserBalance] = useState('');
  const [connButtonText, setConnButtonText] = useState("Connect Wallet!");
  const [currentChain, setCurrentChain] = useState('');

  const connectWalletHandler = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log("MetaMask Here!");

      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          console.log(`Result: ${result}`);
          accountChangedHandler(result[0]);
          setConnButtonText("Wallet Connected");
          getAccountBalance(result[0]);
          //setCurrentChain(result[1]);
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      console.log("You need to install MetaMask");
      setErrorMessage("Please install MetaMask browser extension to interact");
    }
  };

  const accountChangedHandler = async (newAccount) => {
    setDefaultAccount(newAccount);
    getAccountBalance(newAccount.toString());
    window.location.reload();
  };

  const getAccountBalance = async (account) => {
    window.ethereum
      .request({ method: "eth_getBalance", params: [account, "latest"] })
      .then((balance) => {
        setUserBalance(ethers.utils.formatEther(balance));
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };
  const chainChangedHandler = () => {
    // reload the page to avoid any errors with chain change mid use of application
    window.location.reload();
  };

  // listen for account changes
  window.ethereum.on("accountsChanged", accountChangedHandler);

  window.ethereum.on("chainChanged", chainChangedHandler);

//   useEffect(() => {
//     checkIfWalletIsConnect();
//   }, []);

  return (
    <WalletContext.Provider
      value={{
        errorMessage,
        defaultAccount,
        userBalance,
        connButtonText,
        currentChain,
        connectWalletHandler,
        getAccountBalance
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
