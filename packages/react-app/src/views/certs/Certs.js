import React, { useContext } from "react";
import { Box as ReBox, Heading, Flex, Text } from "rebass";

import { CurrentUserContext } from "../../contexts/Store";
import CertList from "../../components/certs/CertList";
import Profile from "../../components/account/Profile";

const Certs = ({ match }) => {
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
          <Heading fontSize={[5, 6, 7]}>Certificates & Achievements</Heading>
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
          Below are the certificates & achievements this address has been
          awarded by a Moloch DAO. Once you are awarded a certificates &
          achievements you can push it into the collectible favorites list in
          your 3Box profile.
        </Text>
      </ReBox>

      <ReBox
        sx={{
          mx: "auto",
          px: 3,
        }}
        p={5}
      >
        <CertList playerAddr={ethAddress} isOwner={isOwner} />
      </ReBox>
    </>
  );
};

export default Certs;
