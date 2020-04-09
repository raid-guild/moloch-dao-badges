import React, { useState } from "react";
import { Button, Card, Text, Flex } from "rebass";

import CheckedBox from "../../assets/icons/checked-box.svg";
import EmptyBox from "../../assets/icons/empty-box.svg";

const BadgeItem = ({ badge, idx, mintNFT, isOwner }) => {
  const [loading, setLoading] = useState(false);

  const badgeClass = badge.earned[idx] ? "" : "unearned-badge";

  const handleHeart = async () => {
    if (!badge) {
      return;
    }
    setLoading(true);
    await mintNFT(badge.metaUris[idx]);
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
      <Text fontSize={10}>Earn with {badge.thresholds[idx]}</Text>
      <img
        className={badgeClass}
        src={`/badges/${badge.files[idx]}`}
        alt="badge"
      />
      <Flex flexDirection="row" justifyContent="flex-start">
        {renderCheck(badge.earned[idx])}
        <Text ml={2}>Earned</Text>
      </Flex>
      <Flex flexDirection="row">
        {renderCheck(badge.hasNft[idx])}
        <Text ml={2}>Minted</Text>
      </Flex>
      {badge.earned[idx] ? (
        <>
          {!badge.hasNft[idx] && isOwner ? (
            <Button variant="primary" mr={2} onClick={handleHeart}>
              {loading ? (
                <span aria-label="loading" role="img">
                  …
                </span>
              ) : (
                <span aria-label="heart" role="img">
                  ❤️ Mint and Favorite
                </span>
              )}
            </Button>
          ) : null}
        </>
      ) : (
        <Text fontSize={10}>
          {badge.thresholds[idx] - badge.userCount} more needed to earn this
          badge
        </Text>
      )}
    </Card>
  );
};

export default BadgeItem;
