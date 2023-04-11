import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { NOM, PAGE_DESC } from "./Mapping";

export default function SpotInfo({ toDisplay, removeCurrent }) {
  return (
    <div id="SpotInfo">
      <h1>{toDisplay[NOM]}</h1>
      {toDisplay[PAGE_DESC] && <p>{toDisplay[PAGE_DESC]}</p>}
      <Button variant="contained" onClick={removeCurrent}>
        Close
      </Button>
    </div>
  );
}
