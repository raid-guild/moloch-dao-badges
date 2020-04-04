import React, { useEffect, useContext, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Flex, Heading, Text, Box } from "rebass";

import { GET_BADGES } from "../../utils/Queries";
import { hydrateBadgeData } from "../../utils/Helpers";
import BadgeRegistry from "../../assets/data/badges.json";
import BadgeItem from "./BadgeItem";
import { Web3ModalContext } from "../../contexts/Store";
import { addresses, abis } from "@project/contracts";

const BadgeList = ({ playerAddr }) => {
  const [badges, setBadges] = React.useState([]);
  const [web3Modal] = useContext(Web3ModalContext)
  const [txloading, setTxloading] = useState(false)
  console.log('web3', web3Modal);

  const { loading, error, data } = useQuery(GET_BADGES, {
    variables: {
      addr: `${playerAddr}`,
    },
  });

  useEffect(() => {
    if (!loading && !error && data) {
      const hydratedBadgeData = hydrateBadgeData(BadgeRegistry, data.badges);
      setBadges(hydratedBadgeData);
    }
  }, [loading, error, data]);

  const mintNFT = async (badgeHash) => {
    setTxloading(true);
    console.log('hash', badgeHash);
    const contract = new web3Modal.web3.eth.Contract(abis.NFT, addresses.badgeNFT);
    try {
      const txReceipt = await contract.methods
        .awardBadge(playerAddr, "https://gateway.pinata.cloud/ipfs/" + badgeHash)
        .send({ from: playerAddr });
      console.log('txReceipt', txReceipt);
    } catch {
      console.log('rejected');
    } finally {
      setTxloading(false);
    }

  }

  const renderBadges = () => {
    return badges.map((badge, idx) => {
      return (
        <Box mb={5} key={idx}>
          <Heading fontSize={5} color="primary">
            {badge.title}
          </Heading>
          <Text fontSize={3} fontWeight="bold" color="primary">
            {badge.description}
          </Text>
          <Flex>{renderBadgeItems(badge)}</Flex>
        </Box>
      );
    });
  };

  const renderBadgeItems = (badge) => {
    return badge.thresholds.map((step, idx) => {
      return <BadgeItem mintNFT={mintNFT} badge={badge} step={step} idx={idx} key={idx} />;
    });
  };

  return <div>{(loading || txloading) && <p>loading...</p>}{badges.length && renderBadges()}</div>;
};

export default BadgeList;
