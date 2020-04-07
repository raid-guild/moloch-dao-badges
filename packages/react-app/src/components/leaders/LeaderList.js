import React from "react";
import { Heading, Flex } from "rebass";
import LeaderListItem from "./LeaderListItem";

const LeaderList = ({ listItems, title }) => {
  console.log("listItems", listItems);

  const renderItems = () => {
    return listItems.map((item, i) => {
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
