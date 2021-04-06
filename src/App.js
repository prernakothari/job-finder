import React from "react";
import {
  Switch,
  Route,
} from "react-router-dom";

import Job from "./Job";
import Gallary from "./Gallary"
import TopBar from "./TopBar";


export default function App() {
  return (
    <div>
      <TopBar />
      <Switch>
        <Route path="/positions">
          <Job />
        </Route>
        <Route path="/">
          <Gallary />
        </Route>
      </Switch>
    </div >
  );
}





