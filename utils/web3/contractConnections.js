import { encodeBytes32String, ethers, Interface } from "ethers";

import { init } from "./web3Instantiation";
import { abi } from "./contractAbi";

const { provider } = init();

export const initializeContract = async () => {
  try {
    const signer = await provider.getSigner();
    const proposalContract = new ethers.Contract(
      "0x3e874855e84915a3a91d207cb9afd875beeec4b4",
      abi,
      signer
    );

    return proposalContract;
  } catch (err) {
    console.log(err);
    // throw err;
  }
};

export const contractInterface = new Interface(abi);
