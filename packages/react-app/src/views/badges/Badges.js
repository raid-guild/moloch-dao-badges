import React, { useContext } from "react";

import { CurrentUserContext } from "../../contexts/Store";
import BadgeList from "../../components/badges/BadgeList";

const Badges = ({ match }) => {
  const [currentUser] = useContext(CurrentUserContext);
  console.log('USERUSER', currentUser);
  
  const ethAddress = match.params.address;
  const isOwner = currentUser && currentUser.username === ethAddress;

  return (
    <div>
      {isOwner ? <h1>Your Badges</h1> : <h1>Badges for {ethAddress}</h1>}
      <BadgeList playerAddr={ethAddress} />
    </div>
  );
};

export default Badges;
