import React, { useContext } from "react";
import { Box as ReBox, Flex } from "rebass";

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
          <h1 className="Home__headline">Certificates & Achievements</h1>
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
        backgroundColor="muted"
      >
        <p>
          Below are the certificates & achievements this address has been
          awarded by a Moloch DAO. Once you are awarded a certificates &
          achievements you can push it into the collectible favorites list in
          your 3Box profile.
        </p>
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
