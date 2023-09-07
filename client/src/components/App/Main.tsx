import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../Main/Home";

export default function Main() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
    </Switch>
  );
}
