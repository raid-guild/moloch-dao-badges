import React, { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Flex, Heading, Text, Box } from "rebass";

import { GET_BADGES } from "../../utils/Queries";
import { hydrateBadgeData } from "../../utils/Helpers";
import BadgeRegistry from "../../assets/data/badges.json";
import BadgeItem from "./BadgeItem";

const BadgeList = ({ playerAddr }) => {
  const [badges, setBadges] = React.useState([]);

  const { loading, error, data } = useQuery(GET_BADGES, {
    variables: {
      addr: `${playerAddr}`,
    },
  });

  useEffect(() => {
    if (!loading && !error && data) {
      const hydratedBadgeData = hydrateBadgeData(BadgeRegistry, data.badges);
      setBadges(hydratedBadgeData);
    }
  }, [loading, error, data]);

  const renderBadges = () => {
    return badges.map((badge, idx) => {
      return (
        <Box mb={5} key={idx}>
          <Heading fontSize={5} color="primary">
            {badge.title}
          </Heading>
          <Text fontSize={3} fontWeight="bold" color="primary">
            {badge.description}
          </Text>
          <Flex>{renderBadgeItems(badge)}</Flex>
        </Box>
      );
    });
  };

  const renderBadgeItems = (badge) => {
    return badge.thresholds.map((step, idx) => {
      return <BadgeItem badge={badge} step={step} idx={idx} key={idx} />;
    });
  };

  return <div>{badges.length && renderBadges()}</div>;
};

export default BadgeList;
