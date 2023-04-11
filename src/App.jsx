import "leaflet/dist/leaflet.css";
import React, { useState, useEffect } from "react";
import Map from "./Map";
import Details from "./Details";
import "./styles.css";
import "leaflet/dist/leaflet.css";

const OPENSHEET =
  "https://opensheet.elk.sh/147i98z2i9wcX2q06vLwOB5lfv_IkltVUgw3SvXH9Y6g/Mapingo+Sport+Data";

const styles = {
  app: {}
};

function Header() {
  return (
    <div id="Header">
      <a id="Logo" href="self">
        <img src="images/MapingoLogoTemp.png" alt="logo"></img>
        <p>Mapingo</p>
      </a>
      <div id="MainMenu">
        <ul>
          <li>
            <a href="">Les activités</a>
          </li>
          <li>
            <a href="">Proposer un spot</a>
          </li>
          <li>
            <a href="">A propos</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default function App(props) {
  const [data, setData] = useState();
  const [current, setCurrent] = useState();
  useEffect(() => {
    fetch(OPENSHEET)
      .then((res) => res.json())
      .then(setData);
  }, []);
  return (
    data && (
      <div style={styles.app}>
        <Header />
        <div id="Main">
          <Map data={data} setCurrent={setCurrent} />
          <Details toDisplay={current} removeCurrent={() => setCurrent(null)} />
        </div>
      </div>
    )
  );
}
