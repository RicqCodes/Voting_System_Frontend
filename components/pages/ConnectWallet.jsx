import { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { TfiAngleRight } from "react-icons/tfi";

import metamaskLogo from "../../assets/wolf.svg";
import { MdClose } from "react-icons/md";

import { fadein, popup } from "@/styles/animation.styled";
import { connectWallet } from "@/utils/web3/walletConnections";
import { updateEOA } from "@/setup/redux/slices/appSlice";
import { ethers } from "ethers";

const ConnectWalletMetamask = ({ setIsOpen }) => {
  const dispatch = useDispatch();
  const [isMetamask, setIsMetamask] = useState("");

  // Handle connect wallet
  const handleWalletConnect = async () => {
    const wallet = await connectWallet();
    console.log(wallet);
    if (wallet?.startsWith("https")) {
      setIsMetamask(wallet);
      return false;
    } else if (wallet === undefined) {
      return false;
    }
    dispatch(updateEOA(ethers.getAddress(wallet)));
  };
  return (
    <>
      <ModalOverlay
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(false);
        }}
      >
        <ModalContainer
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <ModalHeader>
            <div onClick={() => setIsOpen(false)}>
              <MdClose size="24" />
            </div>
          </ModalHeader>
          <ModalBody>
            <Content>
              <span>Choose your preferred wallet:</span>
              <Wallets>
                <Wallet
                  onClick={() => {
                    handleWalletConnect().then((res) => {
                      if (res === false) return;
                      setIsOpen(false);
                    });
                  }}
                >
                  <div>
                    <Image src={metamaskLogo} alt="" />
                    <span>
                      <strong>Metamask</strong>
                    </span>
                  </div>
                  <TfiAngleRight />
                </Wallet>
              </Wallets>

              <ErrorText>
                {isMetamask.length > 0 && (
                  <small>
                    You don't have metamask installed, please install{" "}
                    <a href={isMetamask} target="_blank" rel="noreferrer">
                      Metamask
                    </a>
                  </small>
                )}
              </ErrorText>
            </Content>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContainer>
      </ModalOverlay>
    </>
  );
};

export default ConnectWalletMetamask;

const ModalOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(var(--background-start-rgb), 0.4);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadein} 0.3s linear;
`;

const ModalContainer = styled.div`
  width: 90%;
  max-width: 650px;
  min-height: 200px;
  max-height: 600px;
  overflow: auto;
  border-radius: 8px;
  background: rgb(var(--background-start-rgb));
  border: 1px solid rgba(var(--foreground-rgb), 0.3);
  padding: 24px;
  animation: ${popup} 0.2s linear;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > div {
    margin-left: auto;
    cursor: pointer;
  }
`;

const ModalBody = styled.div`
  margin-top: 18px;
  color: rgb(var(--foreground-rgb));
`;

const ModalFooter = styled.div`
  padding: 12px;
`;

const Content = styled.div`
  display: flex;
  gap: 18px;
  flex-direction: column;
  max-width: 500px;
  margin: 0 auto;

  span {
    font-size: 14px;
    letter-spacing: 0px;
  }
`;

const Wallets = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
`;

const Wallet = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 18px;
  border-radius: 8px;
  background-color: rgba(var(--foreground-rgb), 0.16);
  cursor: pointer;

  > div {
    display: flex;
    gap: 18px;
    align-items: center;
  }
`;

const ErrorText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    text-decoration: underline;
  }
`;
