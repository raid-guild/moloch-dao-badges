import React, { useState, useEffect } from "react";
import Box from "3box";
import { Flex, Text } from "rebass";
import { Link } from "react-router-dom";
import makeBlockie from "ethereum-blockies-base64";

import { truncateAddr } from "../../utils/Helpers";

const LeaderListItem = ({ item, rank }) => {
  const [profile, setProfile] = useState();

  useEffect(() => {
    const set3BoxData = async () => {
      try {
        const profile = await Box.getProfile(item.memberAddress);
        setProfile(profile);
      } catch (err) {
        console.log("3box err", err);
      }
    };

    set3BoxData();
  }, []);

  return (
    <Link to={`/badges/${item.memberAddress}`}>
      <Flex>
        <Text mr={5}>{rank}.</Text>
        <Text mr={5}>
          {profile && profile.image ? (
            <img
              alt=""
              width="40"
              height="40"
              style={{ backgroundColor: "#b5b5b5" }}
              src={
                profile.image
                  ? `https://ipfs.infura.io/ipfs/${profile.image[0].contentUrl["/"]}`
                  : null
              }
            />
          ) : (
            <img
              alt=""
              width="40"
              height="40"
              style={{ backgroundColor: "#b5b5b5" }}
              src={makeBlockie(item.memberAddress)}
            />
          )}

          {truncateAddr(item.memberAddress)}
        </Text>
        <Text mr={5}>{item.count}</Text>
      </Flex>
    </Link>
  );
};

export default LeaderListItem;
