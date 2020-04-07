import React, { useEffect, useState } from "react";
import Box from "3box";
import { Flex, Text, Box as ReBox } from "rebass";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";

import { GET_MEMBERSHIP_META } from "../../utils/Queries";
import { truncateAddr } from "../../utils/Helpers";
import makeBlockie from "ethereum-blockies-base64";

const Profile = ({ ethAddress }) => {
  const [profile, setProfile] = useState();

  useEffect(() => {
    const set3BoxData = async () => {
      try {
        const profile = await Box.getProfile(ethAddress);
        setProfile(profile);
      } catch (err) {
        console.log("3box err", err);
      }
    };

    set3BoxData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ethAddress]);

  const { loading, error, data } = useQuery(GET_MEMBERSHIP_META, {
    variables: {
      addr: `${ethAddress}`,
    },
  });

  const formatDate = (unixTimestamp) => {
    return moment.unix(unixTimestamp).format("MM/DD/YYYY");
  };

  if (loading) return <p>loading...</p>;
  if (error) return <p>profile error</p>;

  return (
    <Flex flexDirection="row" flexWrap="wrap" mx={-2} alignItems="flex-start">
      <ReBox px={2} py={2}>
        {profile && profile.image ? (
          <img
            alt=""
            width="200"
            height="200"
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
            width="200"
            height="200"
            style={{ backgroundColor: "#b5b5b5" }}
            src={makeBlockie(ethAddress)}
          />
        )}
      </ReBox>
      <ReBox m={2} px={2} py={2} bg="background" color="primary">
        <Text p={2}>{truncateAddr(ethAddress)}</Text>
        {profile ? (
          <>
            <Text p={2}>
              {profile.name} {profile.emoji}
            </Text>
            <Text p={2}>{profile.description}</Text>
          </>
        ) : null}
        {data.members[0] ? (
          <Text p={2}>
            DAO Member since {formatDate(+data.members[0].createdAt)}
          </Text>
        ) : (
          <Text p={2}>Not a DAO Member</Text>
        )}
      </ReBox>
    </Flex>
  );
};

export default Profile;
