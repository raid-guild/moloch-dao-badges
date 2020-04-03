export const hydrateBadgeData = (badgeRegistery, userData) => {
  return badgeRegistery.badges.map((badgeType) => {
    const userCount = +userData[0][badgeType.key];
    badgeType.earned = badgeType.thresholds.map((limit) => {
      return userCount >= limit;
    });
    badgeType.userCount = userCount || 0;

    return badgeType;
  });
};
