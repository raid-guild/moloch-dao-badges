import React from "react";
import { Card, Text } from "rebass";

const BadgeItem = ({ badge, idx }) => {
  const badgeClass = badge.earned[idx] ? "" : "unearned-badge";

  return (
    <Card width={256}>
      <Text>{badge.thresholds[idx]}</Text>
      {badge.earned[idx] ? (
        <Text>You got it!</Text>
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
