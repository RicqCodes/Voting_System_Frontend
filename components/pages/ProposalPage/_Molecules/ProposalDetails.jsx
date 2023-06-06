import styled from "styled-components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import { flex } from "@/styles/css.utils.styled";
import LiveIndicator from "../../_molecules/LiveIndicator";
import CheckMark from "../../_molecules/CheckMark";
import Status from "../../_molecules/Status";
import { Button } from "@/styles/elements.styled";
import { device } from "@/styles/utils.styled";
import { useRouter } from "next/router";
import {
  useCloseProposalMutation,
  useGetProposalQuery,
  useGetUserVotePerProposalQuery,
  useLazyGetVoteEventsForProposalQuery,
  useVoteProposalMutation,
} from "@/setup/redux/api/api";
import {
  convertCurrentTimeToTimestamp,
  extractErrorMessage,
  findArrayWithHighestLength,
  formatTimestamp,
} from "@/utils/helpers";
import Countdown from "../../_molecules/Countdown";
import DetailSkeleton from "../../_molecules/Skeleton/DetailsSkeleton";
import VoteOptions from "./VoteOptions";
import { connectWallet } from "@/utils/web3/walletConnections";

const ProposalDetails = ({ proposal }) => {
  const { query } = useRouter();
  const { pid } = query;
  const { EOA } = useSelector((state) => state.app);
  const [isOpen, setIsOpen] = useState(false);

  let winner = "";

  const [closeProposal, { isLoading: closingProposal }] =
    useCloseProposalMutation();
  const [voteProposal, { isLoading: voting }] = useVoteProposalMutation();

  const {
    data: hasVoted,
    isLoading: hasVotedIsLoading,
    error,
  } = useGetUserVotePerProposalQuery({ pid, EOA });

  const [
    getVoteEventsForProposal,
    { data: allVotes, isLoading: isWinnerLoading },
  ] = useLazyGetVoteEventsForProposalQuery();

  // Define the enum values
  const VoteChoice = {
    0: "Abstain",
    1: "Yes",
    2: "No",
  };

  const handleVote = async (choice) => {
    await toast.promise(
      voteProposal({
        pid,
        choice: Number(choice),
      }).unwrap(),
      {
        loading: () => `sending vote (tx) to the blockchain, wait... `,
        success: ({ tx, receipt }) => {
          `Your transaction has been mined successfully. ${(
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://sepolia.etherscan.io/tx/${receipt?.hash}`}
            >
              Go to etherscan to view transaction
            </a>
          )}`;
        },
        error: (err) => extractErrorMessage(err),
      },
      {
        style: {
          background: "#000",
          border: "1px solid #fff",
          color: "#fff",
        },
        position: "top-center",
      }
    );
  };

  const handleCloseProposal = async () => {
    try {
      if (proposal?.endingTimestamp > convertCurrentTimeToTimestamp()) {
        toast(
          "Proposal is still running, you can only close when the proposal has ended",
          {
            style: {
              background: "#000",
              border: "1px solid #fff",
              color: "#fff",
            },
            position: "top-center",
          }
        );
        return;
      }

      proposal?.[2] &&
        (await toast.promise(
          closeProposal(pid).unwrap(),
          {
            loading: () =>
              `sending close proposal (tx) to the blockchain, wait... `,
            success: ({ tx, receipt }) => {
              clearForm();
              return `Your transaction has been mined successfully.;
            ${(
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://sepolia.etherscan.io/tx/${receipt?.data.hash}`}
              >
                Go to etherscan to view transaction
              </a>
            )}`;
            },
            error: (err) => console.error(err),
          },
          {
            style: {
              background: "#000",
              border: "1px solid #fff",
              color: "#fff",
            },
            position: "top-center",
          }
        ));

      await getVoteEventsForProposal(pid);
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    if (pid && !proposal?.isOpened) getVoteEventsForProposal(pid);
  }, [pid]);

  useEffect(() => {
    const connect = async () => {
      if (EOA === null) {
        const res = await connectWallet();
        res.startsWith("https") &&
          toast(`Please install metamask and connect to view content`, {
            style: {
              background: "#000",
              border: "1px solid #fff",
              color: "#fff",
            },
            position: "top-center",
          });
      }
    };
    connect();
  }, []);

  winner =
    allVotes && findArrayWithHighestLength(allVotes).key === "yesVotes"
      ? "Passed"
      : allVotes && findArrayWithHighestLength(allVotes).key === "noVotes"
      ? "Rejected"
      : allVotes && findArrayWithHighestLength(allVotes).key === "abstainVotes"
      ? "Undecided"
      : allVotes === undefined
      ? ""
      : "No votes";

  return (
    <>
      {winner?.length > 0 && EOA?.length > 0 && proposal ? (
        <>
          <DetailsContainer>
            <VotingDetails>
              <TopContent>
                <div>
                  {proposal?.startingTimestamp >
                  convertCurrentTimeToTimestamp() ? (
                    <small>Upcoming</small>
                  ) : convertCurrentTimeToTimestamp() >
                      proposal?.startingTimestamp &&
                    convertCurrentTimeToTimestamp() <
                      proposal?.endingTimestamp ? (
                    <>
                      <LiveIndicator />
                      <small>In Progress</small>
                    </>
                  ) : (
                    <small>Ended</small>
                  )}
                </div>
                <div>
                  {hasVoted?.voted?.toString().length > 0 &&
                  hasVoted?.hasVoted ? (
                    <>
                      <p>You Voted</p>
                      <CheckMark voted={VoteChoice[hasVoted.voted]} />
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </TopContent>
              {proposal && !proposal?.isOpened ? (
                <Status winner={winner.toLowerCase()} />
              ) : (
                ""
              )}
            </VotingDetails>
            <ProposalDetailsContainer>
              <div>
                <h3>{proposal?.title}</h3>
                <p>{proposal?.description}</p>
                <Action>
                  <TimeStampsContainer>
                    <div>
                      <p>Submit Time</p>
                      <small>
                        {formatTimestamp(proposal?.startingTimestamp) ||
                          "00:00:00"}
                      </small>
                    </div>
                    <div>
                      <p>Voting Starts</p>
                      <small>
                        {formatTimestamp(proposal?.startingTimestamp) ||
                          "00:00:00"}
                      </small>
                    </div>
                    <div>
                      <p>Voting Ends</p>
                      <small>
                        {formatTimestamp(proposal?.endingTimestamp) ||
                          "00:00:00"}
                      </small>
                    </div>
                  </TimeStampsContainer>
                  <>
                    {proposal?.owner === EOA && (
                      <Halt
                        onClick={handleCloseProposal}
                        disabled={!proposal?.[2]}
                      >
                        {proposal?.[2] ? "Close" : "Closed"}
                      </Halt>
                    )}
                    {proposal?.startingTimestamp >
                    convertCurrentTimeToTimestamp() ? (
                      <div className="countdown">
                        <Countdown
                          timestamp={proposal?.startingTimestamp}
                          withoutPrefix
                        />
                      </div>
                    ) : (
                      <Button
                        disabled={
                          !proposal?.[2] ||
                          convertCurrentTimeToTimestamp() >
                            proposal?.endingTimestamp
                        }
                        onClick={() => setIsOpen(true)}
                      >
                        {convertCurrentTimeToTimestamp() >
                        proposal?.endingTimestamp
                          ? "Ended"
                          : "Vote"}
                      </Button>
                    )}
                  </>
                </Action>
              </div>
              <Image>
                <img src={proposal?.imgUrl} alt="background" />
              </Image>
            </ProposalDetailsContainer>
          </DetailsContainer>
        </>
      ) : (
        <DetailSkeleton />
      )}
      {isOpen && (
        <VoteOptions pid={pid} setIsOpen={setIsOpen} handleVote={handleVote} />
      )}
    </>
  );
};

export default ProposalDetails;

const DetailsContainer = styled.div`
  width: 100%;
  ${() => flex({ fd: "column", gap: "24px" })};
`;

const VotingDetails = styled.div`
  /* width: 50%; */
  ${() => flex({ ai: "center", gap: "48px" })};
  ${() => device.down("xxs")} {
    ${() => flex({ gap: "24px", fd: "column-reverse" })};
  }
`;

const TopContent = styled.div`
  width: 100%;
  ${() => flex({ gap: "12px", ai: "center" })};

  > div:first-child {
    ${() => flex({ gap: "12px", ai: "center" })};
    background: rgba(255, 255, 255, 0.1);
    padding: 8px;
    border-radius: 3px;
  }

  > div:last-child {
    ${() => flex({ gap: "12px", ai: "center" })};
    p {
      font-size: 14px;
    }
  }
`;

const ProposalDetailsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 46px;

  ${() => device.down("md")} {
    display: flex;
    flex-wrap: wrap;
  }

  > div {
    width: 100%;
    ${() => flex({ fd: "column", gap: "36px" })};

    h3 {
      font-size: 24px;
    }

    p {
      font-size: 16px;
    }
  }
`;

const Image = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* max-width: 320px; */
  width: 100%;
  height: 360px;

  img {
    width: 100%;
    height: 100%;
    border-radius: var(--border-radius);
  }
`;

const TimeStampsContainer = styled.div`
  width: 100%;
  ${() => flex({ gap: "18px", ai: "center" })};

  ${() => device.down("md")} {
    display: flex;
    flex-wrap: wrap;
  }

  > div {
    ${() => flex({ gap: "8px", fd: "column" })};

    p {
      color: rgba(var(--foreground-rgb), 0.6);
    }
  }
`;

const Action = styled.div`
  width: 100%;
  ${() => flex({ gap: "18px", jc: "space-between", ai: "center" })};

  ${() => device.down("md")} {
    display: flex;
    flex-wrap: wrap;

    button {
      width: 100%;
    }
  }

  button {
    background-color: rgba(var(--foreground-rgb), 0.1);
  }

  .countdown {
    padding: 12px 18px;
    border: 1px solid rgba(var(--foreground-rgb), 0.3);
    border-radius: var(--border-radius);
    display: ${() => flex({ ai: "center", jc: "center" })};
  }
`;

const Halt = styled(Button)`
  background-color: red !important;
  border: 2px solid rgba(var(--foreground-rgb), 0.2);
  height: 40.5px;
`;
