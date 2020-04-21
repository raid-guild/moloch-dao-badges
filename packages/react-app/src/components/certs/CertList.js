import React, { useEffect, useContext, useState } from "react";
import { Flex, Heading, Text, Box as ReBox } from "rebass";
import Box from "3box";

import { hydrateCertData, getLog } from "../../utils/Helpers";
import CertRegistry from "../../assets/data/certs.json";
import CertItem from "./CertItem";
import { Web3ModalContext, CurrentUserContext } from "../../contexts/Store";
import addresses from "../../contracts/addresses";
import abi from "../../contracts/certNFT.json";

const CertList = ({ playerAddr, isOwner }) => {
  const [web3Modal] = useContext(Web3ModalContext);
  const [currentUser] = useContext(CurrentUserContext);

  const [certs, setCerts] = React.useState([]);
  const [txloading, setTxloading] = useState(false);
  const [contract, setContract] = useState();
  const [events, setEvents] = useState();
  const [playerNFTs, setPlayerNFTs] = useState([]);

  // get mint log events for player and nft contract
  useEffect(() => {
    const asyncGetLogs = async () => {
      const contractAddr =
        +process.env.REACT_APP_CHAIN_ID === 42
          ? addresses.badgeNFT.kovan
          : addresses.badgeNFT.mainnet;
      const nftContract = new web3Modal.web3.eth.Contract(abi, contractAddr);
      setContract(nftContract);
      const events = await getLog(nftContract, playerAddr);
      setEvents(events);
    };
    if (web3Modal.web3) {
      asyncGetLogs();
    }
  }, [web3Modal.web3, playerAddr]);

  // get token deatils (uri) for each token.
  useEffect(() => {
    const getDetails = async () => {
      const promises = [];

      events.forEach((ev) => {
        const prom = contract.methods.tokenURI(ev.returnValues.tokenId).call();
        promises.push(prom);
      });
      const tokenURIs = await Promise.all(promises);
      setPlayerNFTs(
        tokenURIs.map((uri) =>
          uri.split("/")[uri.split("/").length - 1].split("-")
        )
      );
    };
    if (events && events.length) {
      getDetails();
    }
  }, [events, contract]);

  // hydrate data for badge item
  useEffect(() => {
    if (playerNFTs) {
      const hydratedCertData = hydrateCertData(
        CertRegistry,
        playerNFTs
      );
      setCerts(hydratedCertData);
    }
  }, [playerNFTs]);

  const favoriteNFT = async (badgeHash, tokenId) => {
    setTxloading(true);

    try {
      const box = await Box.openBox(currentUser.username, window.ethereum);
      currentUser.profile.collectiblesFavorites.push({
        address: addresses.certFT,
        token_id: tokenId,
      });
      await box.public.set(
        "collectiblesFavorites",
        currentUser.profile.collectiblesFavorites
      );
    } catch (err) {
      console.log("3box error:", err);
    } finally {
      setTxloading(false);
      return true;
    }
  };

  const renderCerts = () => {
    if (!certs) {
      return;
    }

    return certs.map((cert, idx) => {

      return (
        <ReBox mb={5} key={idx}>
          <Heading fontSize={5} p={2} color="background" bg="highlight">
          {cert.type}: {cert.title}
          </Heading>
          <Text fontSize={3} p={2} fontWeight="bold" color="primary">
            {`${cert.description}`}
          </Text>
          <Flex p={2}>{renderCertItems(cert)}</Flex>
        </ReBox>
      );
    });
  };

  const renderCertItems = (cert) => {
    return cert.thresholds.map((step, idx) => {

      return (
        <CertItem
          mintNFT={favoriteNFT}
          cert={cert}
          step={step}
          idx={idx}
          key={idx}
          isOwner={isOwner}
        />
      );
    });
  };

  return (
    <div>
      {txloading && <p>loading...</p>}
      {certs.length && renderCerts()}
    </div>
  );
};

export default CertList;
