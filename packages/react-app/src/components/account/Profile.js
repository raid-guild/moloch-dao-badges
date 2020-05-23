import React, { useEffect, useState, useRef } from "react";
import Box from "3box";
import { Flex, Box as ReBox } from "rebass";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";

import { GET_MEMBERSHIP_META } from "../../utils/Queries";
import { truncateAddr } from "../../utils/Helpers";
import makeBlockie from "ethereum-blockies-base64";

const Profile = ({ ethAddress }) => {
  const membershipBar = useRef();
  const [profile, setProfile] = useState();

  const { loading, error, data } = useQuery(GET_MEMBERSHIP_META, {
    variables: {
      addr: `${ethAddress}`,
    },
  });

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

  const formatDate = (unixTimestamp) => {
    return moment.unix(unixTimestamp).format("MM/DD/YYYY");
  };

  if (loading) return <p>loading...</p>;
  if (error) return <p>profile error</p>;

  if (membershipBar.current && data) {
    const value = +data.members.length / 10;
    window.RPGUI.set_value(membershipBar.current, value);
  }

  return (
    <Flex flexDirection="row" flexWrap="wrap" mx={-2} alignItems="flex-start">
      <ReBox px={2} py={2}>
        <div className="rpgui-container framed-grey">
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
        </div>
      </ReBox>
      <ReBox m={2} px={2} py={2}>
        <div className="rpgui-container framed-grey">
          <p p={2}>{truncateAddr(ethAddress)}</p>
          {profile ? (
            <>
              <p p={2}>
                {profile.name} {profile.emoji}
              </p>
              <p p={2}>{profile.description}</p>
            </>
          ) : null}
          {data.members[0] ? (
            <p p={2}>
              DAO Member since {formatDate(+data.members[0].createdAt)}
            </p>
          ) : (
            <p p={2}>Not a DAO Member</p>
          )}
        </div>
      </ReBox>
      <ReBox m={2} px={2} py={2}>
        <div className="rpgui-container framed-grey Profile__bar">
          <p>Member of {data.members.length} daos</p>
          <div
            id="membership-progress"
            className="rpgui-progress red"
            ref={membershipBar}
          ></div>
        </div>
      </ReBox>
    </Flex>
  );
};

export default Profile;
