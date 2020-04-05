import React from "react";
import { Card, Text } from "rebass";
import { Button } from "react-bootstrap";

const BadgeItem = ({ badge, idx, mintNFT }) => {
  const badgeClass = badge.earned[idx] ? "" : "unearned-badge";

  const handleHeart = () => {
    if (!badge) {
      return;
    }
    mintNFT(badge.metaUris[idx])
  }

  return (
    <Card width={256}>
      <Text>{badge.thresholds[idx]}</Text>
      {badge.earned[idx] ? (
        <>
          <Text>You got it!</Text>
          {!badge.hasNft[idx] ? (
            <Button variant='primary' mr={2} onClick={handleHeart}>
              <span aria-label="heart" role="img">❤️</span>
            </Button>
          ) : (
              <Button variant='outline' mr={2} disabled><span aria-label="check" role="img">✔</span></Button>
            )}
        </>
      ) : (
          <Text>
            {badge.thresholds[idx] - badge.userCount} more to earn this badge
        </Text>
        )}
      <img
        className={badgeClass}
        src={`/badges/${badge.files[idx]}`}
        alt="badge"
      />
    </Card>
  );
};

export default BadgeItem;
