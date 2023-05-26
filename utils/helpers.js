import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import { init } from "./web3/web3Instantiation";

const { provider } = init();

export const extractMMErrorMessage = (error) => {
  const errorMessage = `${error}`;
  return errorMessage.slice(6).split("(")[0];
};

export const shortenAddress = (addr) => {
  return `${addr?.slice(0, 5)}...${addr?.slice(-3)}`;
};

export const calculateTimeStamp = (startDate, endDate, startTime, endTime) => {
  const startUTCString = new Date(startDate).toISOString().split("T")[0];
  const endUTCString = new Date(endDate).toISOString().split("T")[0];

  const startDateTimeString = `${startUTCString}T${startTime}`;
  const endDateTimeString = `${endUTCString}T${endTime}`;

  const startingTimestamp = Date.parse(startDateTimeString) / 1000;
  const endingTimestamp = Date.parse(endDateTimeString) / 1000;

  return { startingTimestamp, endingTimestamp };
};

export const convertCurrentTimeToTimestamp = () => {
  const currentDate = new Date();
  const unixTimestamp = Math.floor(currentDate.getTime() / 1000);
  return unixTimestamp;
};

export const extractErrorMessage = (error) => {
  return error.message.match(/"([^"]+)"/)[1];
};

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Address copied to clipboard");
  } catch (err) {
    toast.error("Could not copy to clipboard");
  }
};

export const getEthBalance = async (account) => {
  try {
    const address = ethers.getAddress(account);
    const balance = await provider.getBalance(address);
    return Number(ethers.formatEther(balance)).toFixed(2);
  } catch (err) {
    console.error(err);
  }
};

export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month starts from 0, so add 1 and pad with leading zero if necessary
  const day = String(date.getDate()).padStart(2, "0"); // Pad day with leading zero if necessary
  const hours = String(date.getHours()).padStart(2, "0"); // Pad hours with leading zero if necessary
  const minutes = String(date.getMinutes()).padStart(2, "0"); // Pad minutes with leading zero if necessary
  const seconds = String(date.getSeconds()).padStart(2, "0"); // Pad seconds with leading zero if necessary

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
};

export const calculatePercentageShare = (value1, value2, value3) => {
  // Calculate the sum of the three values
  const sum = value1 + value2 + value3;

  // Calculate the percentage share for each value
  const percentage1 = (value1 / sum) * 100;
  const percentage2 = (value2 / sum) * 100;
  const percentage3 = (value3 / sum) * 100;

  // Return the percentage shares as an object
  return {
    abstain: percentage1.toFixed(2),
    yes: percentage2.toFixed(2),
    no: percentage3.toFixed(2),
  };
};

export const findArrayWithHighestLength = (obj) => {
  const arrays = Object.entries(obj); // Extract the arrays and their corresponding keys from the object

  // Use reduce() to iterate over the arrays and find the one with the highest length
  const arrayWithHighestLength = arrays.reduce(
    (acc, [key, value]) => {
      if (value.length > acc.array.length) {
        return { key, array: value };
      }
      return acc;
    },
    { key: null, array: [] }
  );

  return arrayWithHighestLength;
};
