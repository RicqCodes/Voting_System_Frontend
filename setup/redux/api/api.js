import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  getDocs,
  collection,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { encodeBytes32String, ethers } from "ethers";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

import { db } from "@/setup/firebase";
import {
  contractInterface,
  initializeContract,
} from "@/utils/web3/contractConnections";
import {
  calculateTimeStamp,
  convertCurrentTimeToTimestamp,
  extractErrorMessage,
} from "@/utils/helpers";
import { toast } from "react-hot-toast";
import { init } from "@/utils/web3/web3Instantiation";
import { abi } from "@/utils/web3/contractAbi";

const { provider } = init();

export const proposalApi = createApi({
  reducerPath: "proposalApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["userWallet", "proposal", "vote"],
  keepUnusedDataFor: 3600,
  endpoints: (builder) => ({
    walletEntry: builder.mutation({
      queryFn: async (EOA) => {
        //Check for user
        const docRef = doc(db, "users", EOA);
        const docSnap = await getDoc(docRef);

        // If there are no user entry create one
        if (!docSnap.exists()) {
          await setDoc(doc(db, "users", EOA), {
            photoUrl: `https://avatars.dicebear.com/api/bottts/${EOA}.svg`,
            timeStamp: serverTimestamp(),
            bio: "Hey there, i am here to create proposal",
          });

          return { data: true };
        } else return { data: docSnap.data() };
      },
      invalidatesTags: ["userWallet"],
    }),
    createProposal: builder.mutation({
      queryFn: async ({
        title,
        description,
        imageUrl,
        startingTimestamp,
        endingTimestamp,
      }) => {
        try {
          const proposalContract = await initializeContract();

          let bytesTitle;
          if (title.length > 32) {
            bytesTitle = encodeBytes32String(title.slice(0, 31));
          } else {
            bytesTitle = encodeBytes32String(
              title.padEnd(32, "F").slice(0, 31)
            );
          }
          const tx = await proposalContract.createProposal(
            bytesTitle,
            startingTimestamp,
            endingTimestamp
          );
          const receipt = await tx.wait();

          if (receipt.status === 1) {
            const proposalId = receipt?.logs[0].topics[1]?.slice(0, 34);

            await setDoc(doc(db, "proposals", proposalId), {
              title,
              description,
              owner: receipt.from,
              proposalId: proposalId,
              submittedTimestamp: serverTimestamp(),
              imgUrl: imageUrl,
              isOpened: true,
              startingTimestamp,
              endingTimestamp,
            });
          }
          return { data: { tx, receipt } };
        } catch (err) {
          throw err;
        }
      },
      invalidatesTags: ["proposal"],
    }),
    voteProposal: builder.mutation({
      queryFn: async ({ pid, choice }) => {
        try {
          const proposalContract = await initializeContract();
          const tx = await proposalContract.voteProposal(pid, choice);
          const receipt = await tx.wait();

          if (receipt.status === 1) {
            await setDoc(doc(db, "votes", tx.from), {
              proposalId: pid,
              choice,
            });
          }
          return { data: { tx, receipt } };
        } catch (err) {
          throw err;
        }
      },
      invalidatesTags: ["vote", "proposal"],
    }),
    closeProposal: builder.mutation({
      queryFn: async (pid) => {
        try {
          const proposalContract = await initializeContract();
          const tx = await proposalContract.stopProposal(pid);

          const receipt = await tx.wait();

          if (receipt.status === 1) {
            const docRef = doc(db, "proposals", pid);
            await updateDoc(docRef, {
              isOpened: false,
            });
          }

          return { data: receipt };
        } catch (err) {
          throw err;
        }
      },
      invalidatesTags: ["proposal"],
    }),
    getAllProposal: builder.query({
      queryFn: async () => {
        try {
          let upcomingProposal = [];
          let runningProposal = [];
          let closedProposal = [];

          const proposal = collection(db, "proposals");
          const proposalSnap = await getDocs(proposal);
          proposalSnap.forEach((proposal) => {
            if (
              convertCurrentTimeToTimestamp() >
                proposal.data().startingTimestamp &&
              convertCurrentTimeToTimestamp() < proposal.data().endingTimestamp
            ) {
              runningProposal.push(proposal.data());
            } else if (
              convertCurrentTimeToTimestamp() <
              proposal.data().startingTimestamp
            ) {
              upcomingProposal.push(proposal.data());
            } else if (
              convertCurrentTimeToTimestamp() > proposal.data().endingTimestamp
            ) {
              closedProposal.push(proposal.data());
            }
          });

          return {
            data: { upcomingProposal, runningProposal, closedProposal },
          };
        } catch (err) {
          console.error(err);
        }
      },
      providesTags: ["proposal"],
    }),
    getProposal: builder.query({
      queryFn: async (proposalId) => {
        try {
          const proposalContract = await initializeContract();
          const proposal = await proposalContract.proposals(`${proposalId}`);
          const detachedData = [];
          proposal.forEach((p, index) => {
            if (typeof p === "bigint") {
              detachedData.push(Number(p));
            } else {
              detachedData.push(p);
            }
          });

          const docRef = doc(db, "proposals", proposalId);
          const docSnap = await getDoc(docRef);
          const data = docSnap.data();
          return { data: { ...data, ...detachedData } };
        } catch (err) {
          return { error: err };
        }
      },
      providesTags: ["proposal"],
    }),
    getUserAccount: builder.query({
      queryFn: async (EOA) => {
        const docRef2 = doc(db, "users", EOA);
        const docSnap = await getDoc(docRef2);
        const data = docSnap.data();

        return { data };
      },
      providesTags: ["userWallet"],
    }),
    getUserVotePerProposal: builder.query({
      queryFn: async ({ pid, EOA }) => {
        try {
          const proposalContract = await initializeContract();
          const hasVoted = await proposalContract.voters(EOA, pid);
          const vote = await proposalContract.getProposalVotes(pid, EOA);
          return { data: { voted: Number(vote), hasVoted } };
        } catch (err) {
          return { error: err };
        }
      },
      providesTags: ["vote"],
    }),
    getVoteEventsForProposal: builder.query({
      queryFn: async (pid) => {
        try {
          const proposalContract = new ethers.Contract(
            "0x3e874855e84915a3a91d207cb9afd875beeec4b4",
            abi,
            provider
          );
          // Create the event filter
          const filter = proposalContract.filters.VoteCasted(null, null, null);
          // Query the filtered events
          const events = await proposalContract.queryFilter(filter);

          // Separate the events by the VoteChoice enum
          const voteChoices = {
            0: [], // VoteChoice.Abstain
            1: [], // VoteChoice.Yes
            2: [], // VoteChoice.No
          };

          events.forEach((event) => {
            const choice = Number(event.args[2]);
            // Check if the proposalId matches
            if (event.args[1] === pid) {
              voteChoices[choice].push(event);
            }
          });

          return {
            data: {
              abstainVotes: voteChoices[0],
              yesVotes: voteChoices[1],
              noVotes: voteChoices[2],
            },
          };
        } catch (err) {
          throw err;
        }
      },
      providesTags: ["vote", "proposal"],
    }),
    getUsersProposal: builder.query({
      queryFn: async (EOA) => {
        try {
          let upcomingProposal = [];
          let runningProposal = [];
          let closedProposal = [];

          const q = query(
            collection(db, "proposals"),
            where("owner", "==", EOA)
          );

          // Create a query against the collection.
          const proposalsDoc = await getDocs(q);
          proposalsDoc.forEach((proposal) => {
            if (
              convertCurrentTimeToTimestamp() >
                proposal.data().startingTimestamp &&
              convertCurrentTimeToTimestamp() < proposal.data().endingTimestamp
            ) {
              runningProposal.push(proposal.data());
            } else if (
              convertCurrentTimeToTimestamp() <
              proposal.data().startingTimestamp
            ) {
              upcomingProposal.push(proposal.data());
            } else if (
              convertCurrentTimeToTimestamp() > proposal.data().endingTimestamp
            ) {
              closedProposal.push(proposal.data());
            }
          });
          return {
            data: { upcomingProposal, runningProposal, closedProposal },
          };
        } catch (err) {
          throw err;
        }
      },
      providesTags: ["proposal"],
    }),
  }),
});

export const {
  useWalletEntryMutation,
  useCreateProposalMutation,
  useGetUserAccountQuery,
  useGetUserVotePerProposalQuery,
  useGetAllProposalQuery,
  useGetProposalQuery,
  useVoteProposalMutation,
  useGetUsersProposalQuery,
  useLazyGetVoteEventsForProposalQuery,
  useCloseProposalMutation,
} = proposalApi;

// 0x46B1719c0ddC94108a8c7B97dB2Fa31A171a7067
// 0x46b1719c0ddc94108a8c7b97db2fa31a171a7067
