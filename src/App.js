import React, { useState } from "react";
import {
  Switch,
  Route,
} from "react-router-dom";

import JobDetails from "./components/JobPost";
import Gallary from "./components/Gallary"
import TopBar from "./components/TopBar";
import { colors } from "./helpers/constants";
import CircularProgress from "@material-ui/core/CircularProgress";


export default function App() {
  let [themeType, setTheme] = useState("light")
  let [spinner, setSpinner] = useState(false)
  return (
    <div style={{ "backgroundColor": themeType === "light" ? colors.bgLight : colors.bgDark }}>
      <TopBar themeType={themeType} handleThemeChange={setTheme} />
      { spinner &&
        <CircularProgress style={{
          position: "absolute", top: "50%", left: "50%"
        }} />
      }
      <Switch>
        <Route path="/positions">
          <JobDetails themeType={themeType} setSpinner={setSpinner} />
        </Route>
        <Route path="/">
          <Gallary themeType={themeType} setSpinner={setSpinner} spinner={spinner} />
        </Route>
      </Switch>
    </div >
  );
}





