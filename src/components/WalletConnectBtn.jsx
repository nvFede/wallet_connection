import React, { useContext } from "react";
import { WalletContext } from "../context/walletContext";
import { shortenAddress } from "../utils/utils";

const WalletConnectBtn = ({styles}) => {
  const { 
    defaultAccount,
    connectWalletHandler,
    userBalance, 
    connButtonText,
    errorMessage
  } = useContext(WalletContext);

  return (
    <>
      {/* <div className="walletCard"> */}
        <button style={styles} className="btn" onClick={connectWalletHandler}>
          { defaultAccount ? 'Connected: ' + shortenAddress(defaultAccount) : connButtonText } 
        </button>
        {/* <div className="accountDisplay">
          <h2>Address: {defaultAccount}</h2>
        </div>
        <div className="balanceDisplay">
          <h2 className="balance">Balance: {userBalance}</h2>
        </div>
        {errorMessage}
      </div> */}
    </>
  );
};

export default WalletConnectBtn;
