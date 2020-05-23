import React, { useState } from "react";
import { Button, Card } from "rebass";

const CertItem = ({ cert, idx, mintNFT, isOwner }) => {
  const [loading, setLoading] = useState(false);

  const badgeClass = cert.hasNft[idx] ? "" : "unearned-badge";

  const handleHeart = async () => {
    if (!cert) {
      return;
    }
    setLoading(true);

    await mintNFT(cert.tokenId[idx]);
    setLoading(false);
  };
  return (
    <Card width={400}>
      <div className="rpgui-container framed-golden-2 unset__container">
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
      </div>
    </Card>
  );
};

export default CertItem;
