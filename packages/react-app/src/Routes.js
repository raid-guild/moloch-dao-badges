import React from "react";
import { Switch, Route } from "react-router-dom";

import About from "./views/about/About";
import Badges from "./views/badges/Badges";
import Home from "./views/home/Home";
import Leaders from "./views/leaders/Leaders";

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/about" exact component={About} />
    <Route path="/leaders" exact component={Leaders} />
    <Route path="/badges/:address" exact component={Badges} />
    <Route path="*" component={Home} />
  </Switch>
);

export default Routes;
