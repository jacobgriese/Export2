import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import {
  COURTE_DESC,
  LATITUDE,
  LONGITUDE,
  NOM,
  CATEGORIE,
  SOUS_CATEGORIE
} from "./Mapping";
import MarkerClusterGroup from "react-leaflet-cluster";
import defineMarker from "./Markers";
import MapContextProvider from "./MapContext";
import MapContextGiver from "./MapContextGiver";

const styles = {
  map: {}
};

export default function Map(props) {
  const points = props.data;
  var center = [46.71330851649129, 2.4389827471556];
  return (
    <div id="Map" style={styles.map}>
      <MapContainer
        //Main map
        style={{ height: "calc(100vh - 80px)", width: "100wh" }}
        center={center}
        zoom={6}
        minZoom={4}
        maxZoom={18}
        scrollWheelZoom={true}
      >
        <TileLayer
          //Base layer : OSM CH (Swiss)
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors - Mapingo Alpha v0.01'
          url="https://tile.osm.ch/switzerland/{z}/{x}/{y}.png"
        />
        {/* <TileLayer
          //OpenSnowMap : pistes de ski alpin, fond et rando, à toggle
          //attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors & ODbL, &copy; <a href="https://www.opensnowmap.org/iframes/data.html">www.opensnowmap.org</a> <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
          url="https://tiles.opensnowmap.org/pistes/{z}/{x}/{y}.png"
        /> */}
        <MarkerClusterGroup chunkedLoading>
          {points.map((point) => (
            <Marker
              key={point[NOM]}
              position={[point[LATITUDE], point[LONGITUDE]]}
              icon={defineMarker(point[SOUS_CATEGORIE], point[CATEGORIE])}
              eventHandlers={{
                click: (e) => {
                  props.setCurrent(point);
                },
                mouseover: (e) => {}
              }}
            >
              <Popup>
                <h4>{point[NOM]}</h4>
                <p>{point[COURTE_DESC]}</p>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
        <MapContextGiver />
      </MapContainer>
    </div>
  );
}
