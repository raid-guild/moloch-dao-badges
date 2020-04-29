import React, { useContext } from "react";
import { Box as ReBox, Heading, Text, Flex, Image, Card, Button } from "rebass";
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
          <Heading fontSize={[5, 6, 7]}>Moloch DAO Badges</Heading>
          <Text mt={60}>DAO participation acheivements.</Text>

          <Flex
            flexDirection="row"
            flexWrap="wrap"
            align-items="center"
            mt={60}
          >
            <Card width={200} m={10}>
              <Image src={`/badges/018-medal-14.svg`} />
              <Text>Participate in DAOs</Text>
            </Card>

            <Card width={200} m={10}>
              <Image src={`/badges/019-medal-15.svg`} />
              <Text>Unlock Badges</Text>
            </Card>

            <Card width={200} m={10}>
              <Image src={`/badges/020-medal-16.svg`} />
              <Text>Mint NFTs</Text>
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
                <Button variant="outline" mr={2}>
                  Badges
                </Button>
              </Link>
              <Link to={`/certs/${currentUser.username}`}>
                <Button variant="outline" mr={2}>
                  Certificates & Achievements
                </Button>
              </Link>
            </>
          ) : (
            <Text>Sign in with Web3 to see your badges</Text>
          )}
          <Link to="/leaders">
            <Button variant="outline" mr={2}>
              Leaders
            </Button>
          </Link>
        </Flex>
      </ReBox>
    </>
  );
};

export default Home;
