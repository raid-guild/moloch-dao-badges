import React, { useEffect } from "react";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import voteBadgeSm from "../../assets/1check.svg";
import voteBadgeMd from "../../assets/10check.svg";
import voteBadgeLg from "../../assets/50check.svg";

const GET_BADGES = gql`
  query($addr: String!) {
    badges(where: { memberAddress: $addr }) {
      memberAddress
      voteCount
      summonCount
      proposalSponsorCount
      proposalSubmissionCount
      rageQuitCount
      jailedCount
    }
  }
`;

export const Badges = props => {
  const { playerAddr } = props;
  console.log("playerAddr", playerAddr);

  const [badges, setBadges] = React.useState([]);

  const { loading, error, data } = useQuery(GET_BADGES, {
    variables: {
      addr: `${playerAddr}`
    }
  });
  console.log(loading, error, data);

  useEffect(() => {
    if (!loading && !error && data) {
      console.log({ data: data });
      setBadges(data.badges);
    }
  }, [loading, error, data]);

  return (
    <div>
      {badges.length && badges[0].voteCount && (
        <div>
          <div>
            {badges[0].voteCount > 0 && (
              <div>
                <img alt="" src={voteBadgeSm} />1
              </div>
            )}
            {badges[0].voteCount > 5 && (
              <div>
                <img alt="" src={voteBadgeMd} />5
              </div>
            )}
            {badges[0].voteCount > 10 && (
              <div>
                <img alt="" src={voteBadgeLg} />
                10
              </div>
            )}
          </div>
        </div>
      )}
      <p>Votes: {badges.length && badges[0].voteCount}</p>
      <p>Summons: {badges.length && badges[0].summonCount}</p>
      <p>
        proposalSponsorCount: {badges.length && badges[0].proposalSponsorCount}
      </p>
      <p>
        proposalSubmissionCount:{" "}
        {badges.length && badges[0].proposalSubmissionCount}
      </p>
      <p>rageQuitCount: {badges.length && badges[0].rageQuitCount}</p>
    </div>
  );
};
