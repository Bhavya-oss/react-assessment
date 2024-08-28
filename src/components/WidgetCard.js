import React from "react";
import PieChartWithCenterLabel from "./charts/PieChartWithCenterLabel";
import GraphChart from "./charts/GraphChart";
import DashBoardBarChart from "./charts/DashBoardBarChart";
import CloseIcon from "@mui/icons-material/Close";
import EmptyDataChart from "./charts/EmptyDataChart";

const renderWidget = (widget) => {
  switch (widget.type) {
    case "pie":
      return <PieChartWithCenterLabel data={widget.data} />;
    case "graph":
      return <GraphChart data={widget.data} />;
    case "bar":
      return <DashBoardBarChart data={widget.data} />;
    default:
      return <div>No Chart Available</div>;
  }
};

function WidgetCard({ widget, category, onDelete }) {
  function handleDeleteCard() {
    onDelete(category.name, widget.name);
  }

  return (
    <div className="widget-card">
      <CloseIcon
        className="card-close-icon"
        onClick={handleDeleteCard} // Ensure handleDeleteCard triggers onDelete correctly
      />
      <p className="card-title">{widget.name}</p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        {widget.data ? renderWidget(widget) : <EmptyDataChart />}
      </div>
    </div>
  );
}

export default WidgetCard;
