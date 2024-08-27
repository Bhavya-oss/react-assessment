// import { IoStatsChartOutline } from "react-icons/io5";

import React from "react";

function EmptyDataChart() {
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <IoStatsChartOutline className="combochart-icon" /> */}
      </div>
      <p style={{ textAlign: "center" }}>No GraphData Available</p>
    </React.Fragment>
  );
}

export default EmptyDataChart;
