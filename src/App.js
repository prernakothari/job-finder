import React from "react";
import {
  Switch,
  Route,
} from "react-router-dom";

import JobDetails from "./JobPost";
import Gallary from "./Gallary"
import TopBar from "./TopBar";


export default function App() {
  return (
    <div>
      <TopBar />
      <Switch>
        <Route path="/positions">
          <JobDetails />
        </Route>
        <Route path="/">
          <Gallary />
        </Route>
      </Switch>
    </div >
  );
}





