import React, { useEffect, useContext, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Flex, Heading, Text, Box } from "rebass";

import { GET_BADGES } from "../../utils/Queries";
import { hydrateBadgeData, getLog } from "../../utils/Helpers";
import BadgeRegistry from "../../assets/data/badges.json";
import BadgeItem from "./BadgeItem";
import { Web3ModalContext } from "../../contexts/Store";
import { addresses, abis } from "@project/contracts";

const BadgeList = ({ playerAddr }) => {
  const [badges, setBadges] = React.useState([]);
  const [web3Modal] = useContext(Web3ModalContext)
  const [txloading, setTxloading] = useState(false)
  const [contract, setContract] = useState()
  const [events, setEvents] = useState()
  const [playerNFTs, setPlayerNFTs] = useState([])
  console.log('rerender', web3Modal);

  const { loading, error, data } = useQuery(GET_BADGES, {
    variables: {
      addr: `${playerAddr}`,
    },
  });

  // get mint log events for player and nft contract
  useEffect(() => {
    const asyncGetLogs = async () => {
      const nftContract = new web3Modal.web3.eth.Contract(abis.NFT, addresses.badgeNFT);
      setContract(nftContract);
      const events = await getLog(nftContract, playerAddr)
      setEvents(events);
    }
    if (web3Modal.web3) {
      asyncGetLogs();
    }
  }, [web3Modal.web3, playerAddr])

  // get token deatils (uri) for each token.
  useEffect(() => {
    const getDetails = async () => {
      const promises = [];
      
      events.forEach((ev) => {
        const prom = contract.methods.tokenURI(ev.returnValues.tokenId).call();
        promises.push(prom)
      })
      const tokenURIs = await Promise.all(promises);
      setPlayerNFTs(tokenURIs.map((uri) => (
        uri.split("/")[uri.split("/").length - 1].split("-")
      )))
    }
    if (events && events.length) {
      getDetails();
    }
  }, [events, contract])

  // hydrate data for badge item
  useEffect(() => {
    if (!loading && !error && data && playerNFTs) {
      const hydratedBadgeData = hydrateBadgeData(BadgeRegistry, data.badges, playerNFTs);
      setBadges(hydratedBadgeData);
    }
  }, [loading, error, data, playerNFTs]);

  const mintNFT = async (badgeHash) => {
    setTxloading(true);
    try {
      const txReceipt = await contract.methods
        .awardBadge(playerAddr, "https://gateway.pinata.cloud/ipfs/" + badgeHash)
        .send({ from: playerAddr });
      console.log('txReceipt', txReceipt);
    } catch {
      console.log('rejected');
    } finally {
      await getEventsFromLog();
      setTxloading(false);
    }

  }

  const getEventsFromLog = async () => {
    const nftContract = new web3Modal.web3.eth.Contract(abis.NFT, addresses.badgeNFT);
    setContract(nftContract);
    const events = await getLog(nftContract, playerAddr);
    setEvents(events);
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
      return <BadgeItem
        mintNFT={mintNFT}
        badge={badge}
        step={step}
        idx={idx}
        key={idx} />;
    });
  };

  return <div>{(loading || txloading) && <p>loading...</p>}{badges.length && renderBadges()}</div>;
};

export default BadgeList;
