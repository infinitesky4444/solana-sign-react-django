import React, { useState } from "react";
import bs58 from 'bs58';
import axios from "axios";
import "./App.css";

declare global {
  interface Window {
    solana: any;
  }
}

const App = () => {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const connectWallet = async () => {
    setIsLoading(true)
    if (window.solana) {
      try {
        const { solana } = window;

        if (solana && solana.isPhantom) {
          const response = await solana.connect();

          const timestamp = Date.now();
          const message = new TextEncoder().encode(`${process.env.REACT_APP_FRONTEND_URL} wants you to sign in with your address ${response.publicKey.toString()} Your signature will expire in 5 mins`);
          const signedMessage = await solana.signMessage(message, "utf8");

          const validResponse = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/valid-signature/`, {
            signature: bs58.encode(signedMessage.signature),
            publickey: response.publicKey.toBase58(),
            timestamp: timestamp
          });
          if (validResponse.status === 200) {
            setWalletAddress(response.publicKey.toString())
          }
          console.log(validResponse)
        } else {
          alert('Phantom wallet not found. Please install it.');
        }
      } catch (error) {
        console.error('Error connecting to the Phantom wallet:', error);
      }
    } else {
      setIsLoading(false)
    }
  };

  const disconnect = () => {
    setWalletAddress('')
    setIsLoading(false)
  }

  return (
    <div className="">
      {walletAddress ? (
        <>
          <div className="flex">
            <button
              className="button px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
              onClick={disconnect}
            >
              <p>Disconnect</p>
            </button>
          </div>
          <div>
            <p className="mt-4 text-center">Connected wallet: {walletAddress}</p>
          </div>
        </>
      ) : (
        <button
          className="button px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={connectWallet}
        >
          {isLoading ? <div className="lds-dual-ring"></div> : <p>Connect Wallet</p>}
        </button>
      )
      }
    </div>
  );
};

export default App;