import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import MapContextProvider from "./MapContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <MapContextProvider>
      <App />
    </MapContextProvider>
  </StrictMode>
);
