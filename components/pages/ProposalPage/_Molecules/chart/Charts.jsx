import styled from "styled-components";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import { useLazyGetVoteEventsForProposalQuery } from "@/setup/redux/api/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
Chart.register(ArcElement);

const options = {
  title: {
    display: true,
    text: "My Doughnut Chart",
    fontSize: 20,
  },
  legend: {
    display: true,
    position: "bottom",
  },
};

const Charts = ({ abstainVotes, noVotes, yesVotes }) => {
  const data = {
    labels: ["Abstain", "Yes", "No"],
    datasets: [
      {
        label: "My First Dataset",
        data: [abstainVotes?.length, yesVotes?.length, noVotes?.length],
        backgroundColor: ["#546198", "#18A572", "#CE4256"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <BarContainer>
      <Doughnut data={data} options={options} />
    </BarContainer>
  );
};

export default Charts;

const BarContainer = styled.div`
  max-width: 520px;
  /* max-width: 420px; */
  width: 100%;
`;
