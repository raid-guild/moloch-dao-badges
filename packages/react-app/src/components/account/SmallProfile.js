import React, { useState, useEffect } from "react";
import Box from "3box";
import makeBlockie from "ethereum-blockies-base64";

import { truncateAddr } from "../../utils/Helpers";

const SmallProfile = ({ memberAddress }) => {
  const [profile, setProfile] = useState();

  useEffect(() => {
    let isCancelled = false;

    const set3BoxData = async () => {
      try {
        const profile = await Box.getProfile(memberAddress);

        if (!isCancelled) {
          setProfile(profile);
        }
      } catch (err) {
        console.log("3box err", err);
      }
    };

    set3BoxData();

    return () => {
      isCancelled = true;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Header__profile">
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
          src={makeBlockie(memberAddress)}
        />
      )}
      <p>{truncateAddr(memberAddress)}</p>
    </div>
  );
};

export default SmallProfile;
