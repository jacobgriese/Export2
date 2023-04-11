import React, { useState, useEffect } from "react";
import { NOM, PAGE_DESC } from "./Mapping";
import HomeFilters from "./HomeFilters";
import SpotInfo from "./SpotInfo";

const styles = {
  container: {}
};

export default function Details(props) {
  if (props.toDisplay) {
    return (
      <div id="FInfo" style={styles.container}>
        <SpotInfo {...props} />
      </div>
    );
  } else {
    return (
      <div id="FInfo" style={styles.container}>
        <HomeFilters />
      </div>
    );
  }
  // return <div style={styles.container}>Please select a marker</div>;
}
