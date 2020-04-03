import React, { useEffect } from "react";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import Badges from '../../assets/data/badges.json';

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

const BadgeList = (props) => {
  const { playerAddr } = props;
  console.log("playerAddr", playerAddr);

  const [badges, setBadges] = React.useState([]);

  const { loading, error, data } = useQuery(GET_BADGES, {
    variables: {
      addr: `${playerAddr}`,
    },
  });
  console.log(loading, error, data);

  useEffect(() => {
    if (!loading && !error && data) {
      console.log({ data: data });
      setBadges(data.badges);
    }
  }, [loading, error, data]);

  const renderBadges = () => {
    Object.entries(badges).map((key, val) => {
      const badgeSet = Badges.badges.find((badge) => badge.title === key);
      return badgeSet.files.map((badge, idx) => (
        <div>
          {val > badgeSet.threshHolds[idx] && (
            <div>
              <img alt="" src={badgeSet.files[idx]} />val
          </div>
          )}
        </div>
      ))

    })

  }

  return (
    <div>
      <h1>{badges.length}</h1>
      {badges.length &&  renderBadges() }

    </div>
  );
};

export default BadgeList;
