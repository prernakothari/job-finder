import React from "react";
import {
  Switch,
  Route,
} from "react-router-dom";

import Job from "./Job";
import Gallary from "./Gallary"



export default function App() {
  return (
    <div>
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





