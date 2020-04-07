import React, { useState } from "react";
import { Button, Card, Text } from "rebass";

const BadgeItem = ({ badge, idx, mintNFT }) => {
  const [loading, setLoading] = useState(false);

  const badgeClass = badge.earned[idx] ? "" : "unearned-badge";

  const handleHeart = async () => {
    if (!badge) {
      return;
    }
    setLoading(true);
    await mintNFT(badge.metaUris[idx])
    setLoading(false);
  }

  return (
    <Card width={256}>
      <Text>{badge.thresholds[idx]}</Text>
      {badge.earned[idx] ? (
        <>
          <Text>You got it!</Text>
          {!badge.hasNft[idx] ? (
            <Button variant='primary' mr={2} onClick={handleHeart}>
              {loading ? (<span aria-label="loading" role="img">…</span>) : (<span aria-label="heart" role="img">❤️</span>)}
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
