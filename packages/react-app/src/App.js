import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
// import { ThemeProvider } from "theme-ui";

// import theme from "./dark-theme";
// import theme from "@rebass/preset";

import Routes from "./Routes";
import Header from "./components/shared/Header";

import "./styles/rpgui.css";
import "./App.css";

function App() {
  return (
    <div className="App rpgui-content">
      {/* <ThemeProvider theme={theme}> */}
      <Router>
        <Header />
        <Routes />
      </Router>
      {/* </ThemeProvider> */}
    </div>
  );
}

export default App;
