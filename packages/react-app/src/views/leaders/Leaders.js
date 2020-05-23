import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Box as ReBox, Heading, Text, Flex } from "rebass";

import { GET_LEADERS } from "../../utils/Queries";
import LeaderList from "../../components/leaders/LeaderList";
import { leaderBoardTitle } from "../../utils/Helpers";

const Leaders = () => {
  const { loading, error, data } = useQuery(GET_LEADERS);

  const renderLeaderBoards = () => {
    return Object.keys(data).map((key) => {
      return (
        <LeaderList
          listItems={data[key]}
          key={key}
          title={leaderBoardTitle[key]}
        />
      );
    });
  };

  return (
    <>
      <ReBox
        sx={{
          mx: "auto",
          px: 3,
        }}
        p={5}
        backgroundColor="muted"
      >
        <Flex flexDirection="column" alignItems="center" textAlign="center">
          <h1 className="Home__headline">Leaders</h1>
        </Flex>
      </ReBox>

      <ReBox
        sx={{
          mx: "auto",
          px: 3,
        }}
        p={5}
      >
        <Flex
          flexDirection="row"
          flexWrap="wrap"
          alignItems="center"
          textAlign="center"
          justifyContent="center"
        >
          {loading ? <Text>Loading</Text> : null}
          {error ? <Text>Loading</Text> : null}

          {data ? renderLeaderBoards() : null}
        </Flex>
      </ReBox>
    </>
  );
};

export default Leaders;
