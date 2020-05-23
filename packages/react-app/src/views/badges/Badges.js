import React, { useContext } from "react";
import { Box as ReBox, Flex } from "rebass";

import { CurrentUserContext } from "../../contexts/Store";
import BadgeList from "../../components/badges/BadgeList";
import Profile from "../../components/account/Profile";

const Badges = ({ match }) => {
  const [currentUser] = useContext(CurrentUserContext);
  const ethAddress = match.params.address;
  const isOwner =
    currentUser &&
    currentUser.username.toLowerCase() === ethAddress.toLowerCase();

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
          <h1 className="Home__headline">Badges</h1>
        </Flex>
      </ReBox>

      <ReBox
        sx={{
          mx: "auto",
          px: 3,
        }}
        px={5}
        py={3}
      >
        <div className="rpgui-container framed-golden-2 unset__container">
          <Profile ethAddress={ethAddress} />
        </div>
      </ReBox>

      <ReBox
        sx={{
          mx: "auto",
          px: 3,
        }}
        px={5}
        py={3}
      >
        <p>
          Below are the badges this address has earned by participating in
          Moloch DAOs. Once you earn a badge you can mint an NFT of the badge
          and push it into the collectible favorites list in your 3Box profile.
        </p>
      </ReBox>

      <ReBox
        sx={{
          mx: "auto",
          px: 3,
        }}
        p={5}
      >
        <BadgeList playerAddr={ethAddress} isOwner={isOwner} />
      </ReBox>
    </>
  );
};

export default Badges;
