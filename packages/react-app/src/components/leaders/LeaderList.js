import React from "react";
import { Heading, Flex } from "rebass";
import LeaderListItem from "./LeaderListItem";

const LeaderList = ({ listItems, title }) => {
  const renderItems = () => {
    return listItems
      .filter((r) => r.count > 0)
      .map((item, i) => {
        return <LeaderListItem item={item} rank={i + 1} key={i} />;
      });
  };
  return (
    <Flex flexDirection="column" m={4}>
      <Heading mb={10}>{title}</Heading>
      {renderItems()}
    </Flex>
  );
};

export default LeaderList;
