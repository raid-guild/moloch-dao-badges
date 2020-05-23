import React, { useEffect, useContext, useState } from "react";
import { Flex, Box as ReBox } from "rebass";
import { Link } from "react-router-dom";

import Box from "3box";

import { hydrateCertData, getLog } from "../../utils/Helpers";
import CertRegistry from "../../assets/data/certs.json";
import CertItem from "./CertItem";
import { Web3ModalContext, CurrentUserContext } from "../../contexts/Store";
import addresses from "../../contracts/addresses";
import abi from "../../contracts/certNFT.json";
import SmallProfile from "../account/SmallProfile";

const CertList = ({ playerAddr, isOwner }) => {
  const [web3Modal] = useContext(Web3ModalContext);
  const [currentUser] = useContext(CurrentUserContext);

  const [certs, setCerts] = React.useState([]);
  const [txloading, setTxloading] = useState(false);
  const [contract, setContract] = useState();
  const [events, setEvents] = useState();
  const [allNFTs, setAllNFTs] = useState([]);

  // get mint log events for player and nft contract
  useEffect(() => {
    const asyncGetLogs = async () => {
      const contractAddr =
        +process.env.REACT_APP_CHAIN_ID === 42
          ? addresses.certNFT.kovan
          : addresses.certNFT.mainnet;
      const nftContract = new web3Modal.web3.eth.Contract(abi, contractAddr);
      setContract(nftContract);
      const events = await getLog(nftContract);

      setEvents(events);
    };
    if (web3Modal.web3) {
      asyncGetLogs();
    }
  }, [web3Modal.web3]);

  // get token deatils (uri) for each token.
  useEffect(() => {
    const getDetails = async () => {
      const promises = [];

      events.forEach((ev) => {
        const prom = contract.methods.tokenURI(ev.returnValues.tokenId).call();
        promises.push(prom);
      });
      const tokenURIs = await Promise.all(promises);

      setAllNFTs(
        tokenURIs.map((uri, idx) => ({
          uri,
          tokenId: events[idx].returnValues.tokenId,
          to: events[idx].returnValues.to,
        }))
      );
    };
    if (events && events.length) {
      getDetails();
    }
  }, [events, contract]);

  // hydrate data for badge item
  useEffect(() => {
    if (allNFTs) {
      const hydratedCertData = hydrateCertData(
        CertRegistry,
        allNFTs,
        playerAddr
      );

      setCerts(hydratedCertData);
    }
  }, [allNFTs, playerAddr]);

  const favoriteNFT = async (tokenId) => {
    setTxloading(true);

    try {
      const box = await Box.openBox(currentUser.username, window.ethereum);
      currentUser.profile.collectiblesFavorites.push({
        address: addresses.certNFT,
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
          <div className="rpgui-container framed unset__container">
            <h3>
              {cert.type}: {cert.title}
            </h3>
            <p>{`${cert.description}`}</p>
            <p>DAO: {`${cert.DAO}`}</p>

            {/* <Flex p={2}> */}
            <Flex
              flexDirection="column"
              flexWrap="wrap"
              mt={20}
              alignItem="center"
            >
              {renderCertItems(cert)}
            </Flex>

            <Flex flexDirection="row" flexWrap="wrap" mt={20}>
              {renderCertOwners(cert)}
            </Flex>
            {/* </Flex> */}
          </div>
        </ReBox>
      );
    });
  };

  const renderCertOwners = (cert) => {
    return cert.owners.map((owner) => {
      return (
        <Link key={owner} to={`/certs/${owner}`}>
          <SmallProfile memberAddress={owner} />
        </Link>
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
