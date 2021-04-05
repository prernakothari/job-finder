import React, { useEffect, useState } from "react";
import {
  Switch,
  Route,
  useLocation,
  Link
} from "react-router-dom";
import axios from "axios"



export default function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>

      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

function Home() {
  let [path, setPath] = useState("")
  let [data, setData] = useState({})
  let location = useLocation();

  useEffect(() => {
    setPath(location.search)
    axios.get("https://jobs.github.com/positions.json" + location.search
      , {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      }
    )
      .then(
        response => response.json())
      .then(
        data => {
          setData(data);
          console.log(data)
        }
      )
      .catch(e => console.log(e))
  }, [path])

  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}
