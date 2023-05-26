import { BrowserProvider } from "ethers";

export const init = () => {
  let provider;
  if (typeof window !== "undefined") {
    provider = new BrowserProvider(window.ethereum);
  }

  return { provider };
};
