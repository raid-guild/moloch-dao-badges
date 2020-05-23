import React, { useContext } from "react";
import { Flex, Text, Box as ReBox } from "rebass";
import { NavLink } from "react-router-dom";
import makeBlockie from "ethereum-blockies-base64";

import { CurrentUserContext } from "../../contexts/Store";
import { Web3SignIn } from "../account/Web3SignIn";
// import { truncateAddr } from "../../utils/Helpers";

const Header = () => {
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);

  return (
    <div className="Header">
      <Flex px={2} color="white" alignItems="center">
        <Text p={4} fontSize={4} fontWeight="bold" textDecoration="none">
          <NavLink to="/">Moloch DAO Badges</NavLink>
        </Text>

        <ReBox mx="auto" />

        {currentUser ? (
          <>
            <ReBox ml={3}>
              <NavLink to={`/badges/${currentUser.username}`}>Badges</NavLink>
            </ReBox>

            <ReBox ml={3}>
              <NavLink
                to={`/certs/${currentUser.username}`}
                className="rpgui-cursor-point"
              >
                Certs
              </NavLink>
            </ReBox>
          </>
        ) : (
          <Web3SignIn setCurrentUser={setCurrentUser} />
        )}

        <ReBox ml={3}>
          <NavLink to="/leaders">Leaders</NavLink>
        </ReBox>

        <ReBox ml={3}>
          {currentUser && currentUser.profile && currentUser.profile.image ? (
            <>
              <p>
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
              </p>
              {/* <p>{truncateAddr(currentUser.username)}</p> */}
            </>
          ) : (
            <>
              {currentUser && currentUser.username ? (
                <>
                  <p color="primary">
                    <img
                      alt=""
                      width="40"
                      height="40"
                      style={{ backgroundColor: "#b5b5b5" }}
                      src={makeBlockie(currentUser.username)}
                    />
                  </p>
                  {/* <p>{truncateAddr(currentUser.username)}</p> */}
                </>
              ) : null}
            </>
          )}
        </ReBox>
      </Flex>
    </div>
  );
};

export default Header;
