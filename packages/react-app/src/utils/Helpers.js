export const hydrateBadgeData = (badgeRegistery, userData, nftData) => {    
  return badgeRegistery.badges.map((badgeType) => {
    const userCount = userData[0] ? +userData[0][badgeType.key] : 0;
    badgeType.earned = badgeType.thresholds.map((limit) => {
      return userCount >= limit;
    });
    badgeType.userCount = userCount || 0;
    badgeType.hasNft = badgeType.thresholds.map((limit) => nftData.some((nft)=>{
      return nft[0]===badgeType.key && nft[1] === limit.toString()
    }));
    return badgeType;
  });
};

export const getLog = async (contract, playerAddr) => {
  
  return await contract.getPastEvents('Transfer', {
    filter: { from: 0, to: playerAddr },
    fromBlock: 0,
    toBlock: 'latest'
  }, (err, ev) => {
    return ev;
  })

}