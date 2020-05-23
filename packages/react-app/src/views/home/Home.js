import React, { useContext } from "react";
import { Box as ReBox, Text, Flex, Card } from "rebass";
import { Link } from "react-router-dom";

import { CurrentUserContext } from "../../contexts/Store";

const Home = () => {
  const [currentUser] = useContext(CurrentUserContext);

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
          <h1 className="Home__headline">Moloch DAO Badges</h1>

          <p>DAO participation acheivements.</p>

          <Flex
            flexDirection="row"
            flexWrap="wrap"
            align-items="center"
            mt={60}
          >
            <Card width={200} m={10}>
              <div className="rpgui-icon sword Home__badge"></div>
              <p>Participate in DAOs</p>
            </Card>

            <Card width={200} m={10}>
              <div className="rpgui-icon shield Home__badge"></div>
              <p>Unlock Badges</p>
            </Card>

            <Card width={200} m={10}>
              <div className="rpgui-icon potion-red Home__badge"></div>
              <p>Mint NFTs</p>
            </Card>
          </Flex>
        </Flex>
      </ReBox>
      <ReBox
        sx={{
          mx: "auto",
          px: 3,
        }}
        p={5}
      >
        <Flex
          flexDirection="row"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="space-around"
          mt={30}
          mx="auto"
        >
          {currentUser ? (
            <>
              <Link to={`/badges/${currentUser.username}`}>
                <button className="rpgui-button">Badges</button>
              </Link>
              <Link to={`/certs/${currentUser.username}`}>
                <button className="rpgui-button">
                  Certificates & Achievements
                </button>
              </Link>
            </>
          ) : (
            <Text>Sign in with Web3 to see your badges</Text>
          )}
          <Link to="/leaders">
            <button className="rpgui-button">Leaders</button>
          </Link>
        </Flex>
      </ReBox>
    </>
  );
};

export default Home;
