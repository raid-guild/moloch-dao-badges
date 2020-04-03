import React, { useContext } from "react";

import { CurrentUserContext } from "../../contexts/Store";
import BadgeList from "../../components/badges/BadgeList";

const Badges = () => {
  const [currentUser] = useContext(CurrentUserContext);

  return (
    <div>
      {currentUser && currentUser.username && (
        <BadgeList playerAddr={currentUser.username} />
      )}
    </div>
  );
};

export default Badges;
