import React, { useState } from "react";
import {
  Switch,
  Route,
} from "react-router-dom";

import JobDetails from "./JobPost";
import Gallary from "./Gallary"
import TopBar from "./TopBar";
import { colors } from "./constants";


export default function App() {
  let [themeType, setTheme] = useState("light")
  return (
    <div style={{ "backgroundColor": themeType === "light" ? colors.bgLight : colors.bgDark }}>
      <TopBar themeType={themeType} handleThemeChange={setTheme} />
      <Switch>
        <Route path="/positions">
          <JobDetails themeType={themeType} />
        </Route>
        <Route path="/">
          <Gallary themeType={themeType} />
        </Route>
      </Switch>
    </div >
  );
}





