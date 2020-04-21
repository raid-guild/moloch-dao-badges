import React, { useState } from "react";
import { Button, Card, Text, Flex } from "rebass";

import CheckedBox from "../../assets/icons/checked-box.svg";
import EmptyBox from "../../assets/icons/empty-box.svg";

const CertItem = ({ cert, idx, favoriteNFT, isOwner }) => {
  const [loading, setLoading] = useState(false);

  //const badgeClass = cert.earned[idx] ? "" : "unearned-badge";
  const badgeClass = false ? "" : "unearned-badge";

  const handleHeart = async () => {
    if (!cert) {
      return;
    }
    setLoading(true);
    await favoriteNFT(cert.metaUris[idx]);
    setLoading(false);
  };

  const renderCheck = (checked) => {
    return checked ? (
      <img src={CheckedBox} alt="Checked" />
    ) : (
      <img width="20" src={EmptyBox} alt="Checked" />
    );
  };

  return (
    <Card width={256}>
      <img
        className={badgeClass}
        src={`/badges/${cert.files[idx]}`}
        alt="cert"
      />
      <Flex flexDirection="row">
        {renderCheck(cert.hasNft[idx])}
        <Text ml={2}>Minted</Text>
      </Flex>

      {!cert.hasNft[idx] && isOwner ? (
        <Button variant="primary" mr={2} onClick={handleHeart}>
          {loading ? (
            <span aria-label="loading" role="img">
              …
            </span>
          ) : (
            <span aria-label="heart" role="img">
              ❤️ Favorite
            </span>
          )}
        </Button>
      ) : null}
    </Card>
  );
};

export default CertItem;
