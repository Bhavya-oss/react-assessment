import { IoStatsChartOutline } from "react-icons/io5";

import React from "react";

function EmptyDataChart() {
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column", // Aligns the icon and text vertically
          height: "100%", // Ensure it takes up the full height of the container
        }}
      >
        <IoStatsChartOutline className="combochart-icon" />
        <p style={{ textAlign: "center", margin: "8px 0 0 0" }}>
          No GraphData Available
        </p>
      </div>
    </React.Fragment>
  );
}

export default EmptyDataChart;
