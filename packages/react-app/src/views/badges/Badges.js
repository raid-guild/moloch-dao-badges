import React, { useContext } from "react";
import { Box as ReBox, Heading, Flex, Text } from "rebass";

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
          <Heading fontSize={[5, 6, 7]}>Badges</Heading>
        </Flex>
      </ReBox>

      <ReBox
        sx={{
          mx: "auto",
          px: 3,
        }}
        px={5}
        py={3}
        backgroundColor="highlight"
      >
        <Profile ethAddress={ethAddress} />
      </ReBox>

      <ReBox
        sx={{
          mx: "auto",
          px: 3,
        }}
        px={5}
        py={3}
        backgroundColor="muted"
      >
        <Text>
          Below are the badges this address has earned by participating in
          Moloch DAOs. Once you earn a badge you can mint an NFT of the badge
          and push it into the Collectible Favorites list in your 3Box profile.
        </Text>
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
