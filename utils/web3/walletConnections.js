import { toast } from "react-hot-toast";
import { init } from "./web3Instantiation";
import { extractMMErrorMessage } from "../helpers";
import { proposalApi } from "@/setup/redux/api/api";
import { store } from "@/setup/redux/store";
import { ethers } from "ethers";

const { provider } = init();

export const connectWallet = async () => {
  try {
    if (!window.ethereum) {
      // MetaMask extension not available, provide download link
      return "https://metamask.io/download.html";
    }
    // Prompt user to connect their wallet
    const accounts = await provider.send("eth_requestAccounts");
    const selectedAccount = accounts[0];

    // Add wallet to backend
    store.dispatch(
      proposalApi.endpoints.walletEntry.initiate(
        ethers.getAddress(selectedAccount)
      )
    );

    // check if the network is right
    checkNetwork();

    // return connected wallet
    return selectedAccount;
  } catch (error) {
    toast.error(extractMMErrorMessage(error));
  }
};

const checkNetwork = async () => {
  const sepoliaNetworkId = "0xaa36a7";
  try {
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    if (chainId !== sepoliaNetworkId) {
      // Network mismatch, prompt user to switch network using MetaMask
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: sepoliaNetworkId }],
      });
    }
  } catch (error) {
    // Handle error while checking network or switching network
    toast.error(error.message);
  }
};

export const disconnectWallet = async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      const accounts = await window.ethereum
        .request({
          method: "wallet_requestPermissions",
          params: [
            {
              eth_accounts: {},
            },
          ],
        })
        .then(() =>
          ethereum.request({
            method: "eth_requestAccounts",
          })
        );

      const account = accounts[0];

      return account;
    } catch (error) {
      toast.error("Failed to disconnect wallet:", error);
    }
  }
};

// Listen for changes in the connected account
