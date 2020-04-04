import React from "react";
import { Card, Text } from "rebass";
import { Button } from "react-bootstrap";

const BadgeItem = ({ badge, idx, mintNFT }) => {
  const badgeClass = badge.earned[idx] ? "" : "unearned-badge";

  return (
    <Card width={256}>
      <Text>{badge.thresholds[idx]}</Text>
      {badge.earned[idx] ? (
        <>
          <Text>You got it!</Text>
          <Button variant='primary' mr={2} onClick={() => mintNFT(badge.metaUris[idx])}>
            <span aria-label="heart" role="img">❤️</span>
          </Button>
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
