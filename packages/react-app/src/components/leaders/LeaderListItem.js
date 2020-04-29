import React from "react";
import { Flex, Text } from "rebass";
import { Link } from "react-router-dom";

import SmallProfile from "../account/SmallProfile";

const LeaderListItem = ({ item, rank }) => {

  return (
    <Link to={`/badges/${item.memberAddress}`}>
      <Flex>
        <Text mr={5}>{rank}.</Text>
        <SmallProfile memberAddress={item.memberAddress} />
        <Text mr={5}>{item.count}</Text>
      </Flex>
    </Link>
  );
};

export default LeaderListItem;
