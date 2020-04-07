import React, { useContext } from "react";
import { Flex, Text, Box as ReBox } from "rebass";
import { NavLink } from "react-router-dom";
import makeBlockie from "ethereum-blockies-base64";

import { CurrentUserContext } from "../../contexts/Store";
import { Web3SignIn } from "../account/Web3SignIn";
import { truncateAddr } from "../../utils/Helpers";

const Header = () => {
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);

  return (
    <Flex px={2} color="white" bg="white" alignItems="center">
      <Text p={4} fontSize={4} fontWeight="bold" textDecoration="none">
        <NavLink to="/">Moloch DAO Badges</NavLink>
      </Text>

      <ReBox mx="auto" />
      <ReBox ml={3}>
        <NavLink to="/leaders">Leaders</NavLink>
      </ReBox>

      {currentUser ? (
        <ReBox ml={3}>
          <NavLink to={`/badges/${currentUser.username}`}>Badges</NavLink>
        </ReBox>
      ) : (
        <Web3SignIn setCurrentUser={setCurrentUser} />
      )}
      <ReBox ml={3}>
        {currentUser && currentUser.profile && currentUser.profile.image ? (
          <ReBox>
            <Text color="primary">
              <img
                alt=""
                width="40"
                height="40"
                style={{ backgroundColor: "#b5b5b5" }}
                src={
                  currentUser.profile.image
                    ? `https://ipfs.infura.io/ipfs/${currentUser.profile.image[0].contentUrl["/"]}`
                    : null
                }
              />
              {truncateAddr(currentUser.username)}
            </Text>
          </ReBox>
        ) : (
          <>
            {currentUser && currentUser.username ? (
              <ReBox>
                <Text color="primary">
                  <img
                    alt=""
                    width="40"
                    height="40"
                    style={{ backgroundColor: "#b5b5b5" }}
                    src={makeBlockie(currentUser.username)}
                  />
                  {truncateAddr(currentUser.username)}
                </Text>
              </ReBox>
            ) : null}
          </>
        )}
      </ReBox>
    </Flex>
  );
};

export default Header;
