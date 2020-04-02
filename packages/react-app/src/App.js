import React, { useState, useContext, useEffect } from "react";

import "./App.css";
import { Web3SignIn } from "./components/account/Web3SignIn";
import { CurrentUserContext } from "./contexts/Store";
import Box from "3box";
import { Badges } from "./views/badges/Badges";

function App() {
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
  const [user3BoxDetail, setUser3BoxDetail] = useState();

  useEffect(() => {
    const get3BoxProfile = async () => {
      const profile = await Box.getProfile(currentUser.username);
      console.log("profile", profile);

      setUser3BoxDetail(profile);
    };
    if (currentUser && currentUser.username) {
      get3BoxProfile();
    }
  }, [currentUser]);

  return (
    <div className="App">
      <header className="App-header">
        {user3BoxDetail && (
          <a
            href={currentUser && `https://3box.io/${currentUser.username}/edit`}
          >
            <p>
              <img
                alt=""
                width="40"
                height="40"
                style={{ backgroundColor: "#b5b5b5" }}
                src={
                  user3BoxDetail.image
                    ? `https://ipfs.infura.io/ipfs/${user3BoxDetail.image[0].contentUrl["/"]}`
                    : null
                }
                roundedCircle
              />{" "}
              {user3BoxDetail.name} {user3BoxDetail.emoji}
            </p>
          </a>
        )}
        {currentUser && currentUser.username && (
          <Badges playerAddr={currentUser.username} />
        )}

        {currentUser && currentUser.username ? (
          <p>{currentUser.username}</p>
        ) : (
          <Web3SignIn setCurrentUser={setCurrentUser} />
        )}
      </header>
    </div>
  );
}

export default App;
