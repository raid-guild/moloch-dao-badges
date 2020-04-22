import React, { useState } from "react";
import { Button, Card } from "rebass";

const CertItem = ({ cert, idx, favoriteNFT, isOwner }) => {
  const [loading, setLoading] = useState(false);

  const badgeClass = cert.hasNft[idx] ? "" : "unearned-badge";

  const handleHeart = async () => {
    if (!cert) {
      return;
    }
    setLoading(true);

    await favoriteNFT(cert.tokenId[idx]);
    setLoading(false);
  };
  // TODO: use cert images
  return (
    <Card width={256}>
      <img
        className={badgeClass}
        src={`/badges/${cert.files[idx]}`}
        alt="cert"
      />
      {cert.hasNft[idx] && isOwner ? (
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
