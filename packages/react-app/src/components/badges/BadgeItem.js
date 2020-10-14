import React, { useState } from "react";
import { Button, Card, Flex } from "rebass";

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

  return (
    <Card width={356} mr={20}>
      <div className="rpgui-container framed unset__container">
        <p>Earn with {badge.thresholds[idx]}</p>
        <img
          className={badgeClass}
          src={`/badges/${badge.files[idx]}`}
          alt="badge"
        />
        <Flex flexDirection="row" justifyContent="flex-start">
          <input
            className="rpgui-checkbox"
            type="checkbox"
            readOnly={true}
            checked={badge.earned[idx]}
          />
          <label>Earned</label>
        </Flex>
        <Flex flexDirection="row">
          <input
            className="rpgui-checkbox"
            type="checkbox"
            readOnly={true}
            checked={badge.hasNft[idx]}
          />
          <label>Minted</label>
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
          <p>
            {badge.thresholds[idx] - badge.userCount} more needed to earn this
            badge.
          </p>
        )}
      </div>
    </Card>
  );
};

export default BadgeItem;
