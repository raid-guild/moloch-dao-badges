import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "theme-ui";

// import theme from "./dark-theme";
import theme from "./rg-theme";

import Routes from "./Routes";
import Header from "./components/shared/Header";

import "./App.css";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Header />
          <Routes />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
