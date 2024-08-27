import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";

// Adjust the chart size to fit within the card
const size = {
  width: 380,
  height: 140,
};

const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  fontSize: 16,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 6} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

function PieChartWithCenterLabel({ data }) {
  const total = data.reduce((accu, curr) => accu + curr.value, 0);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <PieChart
        series={[
          {
            data,
            innerRadius: 40,
            cx: 66,
            cy: 60,
            colorField: "color",
          },
        ]}
        {...size}
      >
        <PieCenterLabel>{total}</PieCenterLabel>
      </PieChart>
    </div>
  );
}

export default PieChartWithCenterLabel;
