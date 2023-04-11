import L from "leaflet";

const customMarker = new L.icon({
  //iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
  iconUrl: "https://cdn-icons-png.flaticon.com/512/375/375349.png",
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40]
});
var LeafIcon = L.Icon.extend({
  options: {
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -45]
  }
});

/// takes a URL and returns a leaflet icon
function makeIcon(url) {
  return new LeafIcon({ iconUrl: url });
}

/// takes an object of the form { sousCat: { cat: "icon url" }}
/// and maps the url to a leaflet icon object
function makeMapperIcons(mapper) {
  const ret = {};
  for (const sousCat in mapper) {
    ret[sousCat] = {};
    for (const cat in mapper[sousCat]) {
      ret[sousCat][cat] = makeIcon(mapper[sousCat][cat]);
    }
  }
  return ret;
}

const markerMapper = makeMapperIcons({
  Décollage: {
    "Spot Parapente": "images/markers/TO_Para.png",
    "Spot Delta": "images/markers/TO_Delta.png",
    "Spot Speed Riding": "images/markers/TO_Speed.png",
    "Spot Parapente / Delta": "images/markers/TO_ParaDelta.png",
    "Spot Parapente / Speed Riding": "images/markers/TO_ParaSpeed.png",
    "Spot Parapente / Delta / Speed Riding":
      "images/markers/TO_ParaDeltaSpeed.png"
  },
  Atterrissage: {
    "Spot Parapente": "images/markers/LD_Para.png",
    "Spot Delta": "images/markers/LD_Delta.png",
    "Spot Speed Riding": "images/markers/LD_Speed.png",
    "Spot Parapente / Delta": "images/markers/LD_ParaDelta.png",
    "Spot Parapente / Speed Riding": "images/markers/LD_ParaSpeed.png",
    "Spot Parapente / Delta / Speed Riding":
      "images/markers/LD_ParaDeltaSpeed.png"
  }
});

/// returns the right leaflet icon from the sousCat and cat
export default function defineMarker(spotSousCat, spotCat) {
  if (spotSousCat in markerMapper) {
    if (spotCat in markerMapper[spotSousCat]) {
      return markerMapper[spotSousCat][spotCat];
    }
  }
  return customMarker;
}
