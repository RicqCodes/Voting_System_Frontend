import { useEffect, useState } from "react";
import styled from "styled-components";
import { BsPerson, BsLink45Deg } from "react-icons/bs";
import { BiCopyAlt } from "react-icons/bi";
import { AiOutlinePoweroff } from "react-icons/ai";
import { MdDocumentScanner } from "react-icons/md";

import { flex } from "@/styles/css.utils.styled";
import Logo from "@/components/common/Logo";
import { Button } from "@/styles/elements.styled";
import {
  connectWallet,
  disconnectWallet,
} from "@/utils/web3/walletConnections";
import { useDispatch, useSelector } from "react-redux";
import { updateEOA } from "@/setup/redux/slices/appSlice";
import {
  useGetUserAccountQuery,
  useWalletEntryMutation,
} from "@/setup/redux/api/api";
import {
  copyToClipboard,
  getEthBalance,
  shortenAddress,
} from "@/utils/helpers";
import useToggle from "@/utils/hooks/useToggle";
import { device } from "@/styles/utils.styled";
import { ethers } from "ethers";
import Link from "next/link";
import ConnectWallet from "@/components/pages/ConnectWallet";

const Header = () => {
  const { EOA } = useSelector((state) => state.app);
  const [balance, setBalance] = useState(false);
  const [walletEntry, { isLoading: walletLoading }] = useWalletEntryMutation();
  const [skip, setSkip] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { toggle, toggleRef, toggledElementRef, handleToggle } = useToggle();
  const { isLoading, data } = useGetUserAccountQuery(EOA, {
    skip,
  });

  // Handle connect wallet
  // const handleWalletConnect = async () => {
  //   const wallet = await connectWallet();
  //   console.log(wallet);
  //   if (wallet.startsWith("https")) return;
  //   dispatch(updateEOA(ethers.getAddress(wallet)));
  // };

  // Handle wallet disconnect
  const handleWalletDisconnect = () => {
    disconnectWallet();
  };

  // Use Effect to handle on page reload to keep user signed in in the UI
  useEffect(() => {
    const recallConnectWallet = async () => {
      // const wallet = await connectWallet();
      const wallet = window.ethereum?.selectedAddress;
      if (!wallet) return;
      dispatch(updateEOA(ethers.getAddress(wallet)));
      const balance = await getEthBalance(wallet);
      setBalance(balance);
    };
    recallConnectWallet();

    (EOA !== undefined || EOA !== null) && setSkip((prev) => !prev);
  }, [EOA, dispatch]);

  // Use Effect to handle on account change.
  useEffect(() => {
    const handleAccountChange = async (accounts) => {
      // Update the currentAccount state with the new account value
      const currentAccount = accounts[0];
      if (!currentAccount) {
        dispatch(updateEOA(null));
        return;
      }
      dispatch(updateEOA(ethers.getAddress(currentAccount)));
      await walletEntry(ethers.getAddress(currentAccount));
    };

    // Subscribe to the 'accountsChanged' event
    window.ethereum?.on("accountsChanged", handleAccountChange);

    // Clean up the subscription when the component unmounts
    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountChange);
    };
  }, [dispatch]);

  return (
    <>
      <HeaderContainer>
        <Logo />
        {data !== undefined && EOA !== null ? (
          <ConnectedWallet>
            <Image
              ref={toggledElementRef}
              alt="display image"
              onClick={handleToggle}
            >
              <img src={data?.photoUrl} alt="logo" />
            </Image>
            <p>{shortenAddress(EOA)}</p>
            {toggle && (
              <DropDown ref={toggleRef}>
                <div>
                  <BsPerson />
                  <p>{balance} ETH</p>
                </div>
                <div>
                  <MdDocumentScanner />
                  <p onClick={handleToggle}>
                    <Link href="/my-proposals">My Proposals</Link>
                  </p>
                </div>
                <a
                  onClick={handleToggle}
                  href={`https://sepolia.etherscan.io/address/${EOA}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsLink45Deg />
                  <p>Etherscan</p>
                </a>
                <div onClick={() => copyToClipboard(EOA)}>
                  <BiCopyAlt />
                  <p>Copy Address</p>
                </div>
                <div onClick={handleWalletDisconnect}>
                  <AiOutlinePoweroff />
                  <p>Disconnect</p>
                </div>
              </DropDown>
            )}
          </ConnectedWallet>
        ) : (
          <Button $size="sm" onClick={() => setIsOpen(true)}>
            Connect Wallet
          </Button>
        )}
      </HeaderContainer>
      {isOpen && <ConnectWallet setIsOpen={setIsOpen} />}
    </>
  );
};

export default Header;

const HeaderContainer = styled.div`
  width: 100%;
  height: 65px;
  position: sticky;
  top: 0;
  background-color: black;
  z-index: 99;
  ${() => flex({ ai: "center", jc: "space-between" })}
`;

const ConnectedWallet = styled.div`
  ${() => flex({ gap: "12px", ai: "center" })};
  position: relative;

  p {
    font-size: 16px;
  }

  ${() => device.down("xxs")} {
    > p {
      display: none;
    }
  }
`;

const Image = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 4px solid #fff;
  cursor: pointer;
`;

const DropDown = styled.div`
  position: absolute;
  top: 64px;
  left: -36px;
  background: black;
  max-width: 480px;
  width: 100%;
  padding: 12px 0;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: var(--border-radius);

  ${() => device.down("xxs")} {
    top: 64px;
    left: -103px;
    width: 158px;
  }

  ${() => flex({ fd: "column", gap: "8px" })};

  > div,
  a {
    width: 100%;
    height: 36px;
    padding: 0 12px;
    ${() => flex({ gap: "8px", ai: "center" })};
    cursor: pointer;

    :hover {
      background-color: rgba(255, 255, 255, 0.2);
    }

    svg {
      height: 18px;
      width: 18px;
    }

    p {
      font-size: 14px;

      a {
        border: none;
        background-color: transparent;
        display: inline-flex;
        padding: 0;

        :hover {
          background-color: transparent;
        }
      }
    }
  }
`;
