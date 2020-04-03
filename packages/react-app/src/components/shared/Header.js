import React, { useEffect, useState, useContext } from "react";
import { Flex, Text, Box as ReBox } from "rebass";
import { NavLink } from "react-router-dom";
import Box from "3box";

import { CurrentUserContext } from "../../contexts/Store";
import { Web3SignIn } from "../account/Web3SignIn";

const Header = () => {
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
  const [user3BoxDetail, setUser3BoxDetail] = useState();

  useEffect(() => {
    const get3BoxProfile = async () => {
      const profile = await Box.getProfile(currentUser.username);

      setUser3BoxDetail(profile);
    };
    if (currentUser && currentUser.username) {
      get3BoxProfile();
    }
  }, [currentUser]);

  return (
    <Flex px={2} color="white" bg="black" alignItems="center">
      <Text p={2} fontWeight="bold">
        <NavLink to="/">DAO Badges</NavLink>
      </Text>

      <ReBox mx="auto" />
      <ReBox ml={3}>
        <NavLink to="/leaders">Leaders</NavLink>
      </ReBox>
      <ReBox ml={3}>
        <NavLink to="/about">About</NavLink>
      </ReBox>

      {currentUser ? (
        <ReBox ml={3}>
          <NavLink to={`/badges/${currentUser.username}`}>My Badges</NavLink>
        </ReBox>
      ) : (
        <Web3SignIn setCurrentUser={setCurrentUser} />
      )}
      <ReBox ml={3}>
        {user3BoxDetail ? (
          <a
            href={currentUser && `https://3box.io/${currentUser.username}/edit`}
          >
            <p>
              <img
                alt=""
                width="40"
                height="40"
                style={{ backgroundColor: "#b5b5b5" }}
                src={
                  user3BoxDetail.image
                    ? `https://ipfs.infura.io/ipfs/${user3BoxDetail.image[0].contentUrl["/"]}`
                    : null
                }
              />{" "}
              {user3BoxDetail.name} {user3BoxDetail.emoji}
            </p>
          </a>
        ) : (
          <>
            {currentUser && currentUser.username ? (
              <p>{currentUser.username}</p>
            ) : null}
          </>
        )}
      </ReBox>
    </Flex>
  );
};

export default Header;
