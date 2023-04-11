import { createContext, useState } from "react";

export const MapContext = createContext({ map: null });

export default function MapContextProvider({ children }) {
  const [map, setMap] = useState(null);
  return (
    <MapContext.Provider
      value={{
        map,
        setMap
      }}
    >
      {children}
    </MapContext.Provider>
  );
}
