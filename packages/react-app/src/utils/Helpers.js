export const hydrateBadgeData = (badgeRegistery, userData, nftData) => {
  return badgeRegistery.badges.map((badgeType) => {
    const userCount = userData[0] ? +userData[0][badgeType.key] : 0;
    badgeType.earned = badgeType.thresholds.map((limit) => {
      return userCount >= limit;
    });
    badgeType.userCount = userCount || 0;
    badgeType.hasNft = badgeType.thresholds.map((limit) =>
      nftData.some((nft) => {
        return nft[0] === badgeType.key && nft[1] === limit.toString();
      })
    );
    return badgeType;
  });
};

export const hydrateCertData = (certRegistery, nftData, playerAddr) => {
  // TODO: this went down hill fast
  return certRegistery.certs.map((certType) => {
    certType.tokenId = [undefined];
    certType.owners = [];
    certType.hasNft = certType.thresholds.map((limit) => {
      return nftData
        .filter((nft) => nft.to === playerAddr)
        .some((nft) => {
          certType.owners = [
            ...new Set(
              nftData
                .filter(
                  (nft) =>
                    nft.to !== playerAddr &&
                    nft.uri.indexOf(certType.metaUris) > -1
                )
                .map((nft) => nft.to)
            ),
          ];
          const hasNft = nft.uri.indexOf(certType.metaUris) > -1 ? true : false;
          if (hasNft) {
            certType.tokenId = [nft.tokenId];
          }
          return hasNft;
        });
    });
    return certType;
  });
};

export const getLog = async (contract, playerAddr = null) => {
  if (playerAddr) {
    return await contract.getPastEvents(
      "Transfer",
      {
        filter: { from: 0, to: playerAddr },
        fromBlock: 0,
        toBlock: "latest",
      },
      (err, ev) => {
        return ev;
      }
    );
  } else {
    return await contract.getPastEvents(
      "Transfer",
      {
        filter: { from: 0 },
        fromBlock: 0,
        toBlock: "latest",
      },
      (err, ev) => {
        return ev;
      }
    );
  }
};

export const truncateAddr = (addr) => {
  return addr.slice(0, 6) + "...";
  // return addr.slice(0, 6) + "..." + addr.slice(-4);
};

export const leaderBoardTitle = {
  membershipsLeaders: "Memberships",
  summonsLeaders: "Summonings",
  submissionLeaders: "Proposal Submissions",
  sponsorLeaders: "Proposal Sponsors",
  voteLeaders: "Votes",
  dissentsLeaders: "Dissents",
  assentsLeaders: "Assents",
  rageLeaders: "Rage Quits",
  jailedLeaders: "Jailings",
};
