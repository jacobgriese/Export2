import React, { useState, useEffect, useContext } from "react";
import { NOM, PAGE_DESC } from "./Mapping";
import { PhotonAddressEngine } from "typeahead-address-photon";
import { MapContext } from "./MapContext";
import { Autocomplete, TextField } from "@mui/material";

const PHOTON_API = "https://photon.komoot.io/api/?q=";

let controller = null;

function makeOptions(features) {
  return features.map((feature) => ({
    label: feature.properties.name,
    feature
  }));
}

export default function HomeFilters(props) {
  const [target, setTarget] = useState("");
  const [features, setFeatures] = useState([]);
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (typeof target === "string" && target.length > 0) {
      if (controller) {
        controller.abort();
      }
      controller = new AbortController();
      fetch(`${PHOTON_API}${target}`, {
        signal: controller.signal
      })
        .then((e) => e.json())
        .then((e) => {
          if (e && Array.isArray(e.features)) {
            setFeatures(e.features);
          }
        });
    } else {
      setFeatures([]);
    }
  }, [target]);

  function goToFeature(feature) {
    if (feature) {
      map.flyTo(
        [feature.geometry.coordinates[1], feature.geometry.coordinates[0]],
        13
      );
    }
  }

  return (
    <div id="HomeFilters">
      <h2>Recherche de spots</h2>
      <Autocomplete
        disablePortal
        freeSolo
        id="combo-box-demo"
        options={makeOptions(features)}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Recherche par lieu"
            onKeyPress={(e) => {
              if (e.key === "Enter" && features.length > 0) {
                goToFeature(features[0]);
              }
            }}
          />
        )}
        inputValue={target}
        onInputChange={(e, value) => setTarget(value)}
        onChange={(_, value) => {
          if (value) {
            goToFeature(value.feature);
          }
        }}
      />
      {/* <input
        id="inpAddress"
        type="text"
        placeholder="Enter address here..."
        value={target}
        onChange={(e) => setTarget(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter" && features.length > 0) {
            goToFeature(features[0]);
          }
        }}
      ></input> */}
      {/* <div>
        {features.map((feature) => (
          <div
            key={feature.properties.osm_id}
            onClick={() => goToFeature(feature)}
          >
            {feature.properties.name}
          </div>
        ))}
      </div> */}
    </div>
  );
}

// var engine = new PhotonAddressEngine();

// $("#inpAddress").typeahead(null, {
//   source: engine.ttAdapter(),
//   displayKey: "description"
// });
