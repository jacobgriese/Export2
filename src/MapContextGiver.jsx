import { useContext, useEffect } from "react";
import { useMap } from "react-leaflet";
import { MapContext } from "./MapContext";

export default function MapContextGiver() {
  const map = useMap();

  const { setMap } = useContext(MapContext);

  useEffect(() => {
    setMap(map);
  }, [map, setMap]);

  return null;
}
