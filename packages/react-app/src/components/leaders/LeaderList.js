import React from "react";
import { Flex } from "rebass";
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
      <div className="rpgui-container framed unset__container">
        <h3>{title}</h3>
        {renderItems()}
      </div>
    </Flex>
  );
};

export default LeaderList;
