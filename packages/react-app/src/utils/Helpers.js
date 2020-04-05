export const hydrateBadgeData = (badgeRegistery, userData, nftData) => {  
  
  return badgeRegistery.badges.map((badgeType) => {
    const userCount = +userData[0][badgeType.key];
    badgeType.earned = badgeType.thresholds.map((limit) => {
      return userCount >= limit;
    });
    badgeType.userCount = userCount || 0;

    badgeType.hasNft = badgeType.thresholds.map((limit) => nftData.some((nft)=>nft[0]===badgeType.title && nft[1] === limit.toString()));
    return badgeType;
  });
};
