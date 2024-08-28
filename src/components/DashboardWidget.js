import React, { useState, useMemo, useEffect } from "react";
import WIDGETDATA from "../assets/data.json";
import DashboardDrawer from "./DashboardDrawer";
import WidgetCard from "./WidgetCard";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import MoreVertSharpIcon from "@mui/icons-material/MoreVertSharp";
import AccessTimeFilledSharpIcon from "@mui/icons-material/AccessTimeFilledSharp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Divider from "@mui/joy/Divider";
import Header from "./Header";

function DashboardWidget() {
  const [open, setOpen] = useState(false);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedWidgets, setSelectedWidgets] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState(WIDGETDATA);

  const handleOpenDrawer = (index) => {
    setSelectedCategoryIndex(index);
    setOpen(true);
  };

  const handleCloseDrawer = () => {
    setOpen(false);
  };

  const handleDeleteWidget = (categoryName, widgetName) => {
    // Update the data to set show to false for the targeted widget
    setData((prevData) => {
      const updatedCategories = prevData.categories.map((category) => {
        if (category.name === categoryName) {
          return {
            ...category,
            widgets: category.widgets.map((widget) =>
              widget.name === widgetName ? { ...widget, show: false } : widget
            ),
          };
        }
        return category;
      });

      return {
        ...prevData,
        categories: updatedCategories,
      };
    });

    // Update selectedWidgets to remove the targeted widget
  };

  const filteredWidgets = useMemo(() => {
    if (!searchTerm)
      return data.categories
        .flatMap((c) => c.widgets)
        .filter((widget) => widget.show);

    const filtered = data.categories
      .flatMap((c) => c.widgets)
      .filter(
        (widget) =>
          widget.show &&
          widget.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return filtered;
  }, [searchTerm, data]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);

    setData((prev) => ({
      ...prev,
      categories: WIDGETDATA?.categories
        ?.map((category) => {
          const filteredWidgets = category.widgets?.filter((widget) =>
            widget.name
              ?.toLowerCase()
              ?.includes(event.target.value?.toLowerCase())
          );

          return {
            ...category,
            widgets: filteredWidgets,
          };
        })
        .filter((category) => category.widgets.length > 0),
    }));
  };

  return (
    <div>
      <Header searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <div className="main">
        {" "}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {" "}
          <h3 style={{ marginBottom: "21px" }}>DNAPP Dashboard</h3>{" "}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <button className="menu-button">
              {" "}
              Add Widget&nbsp;&nbsp;&nbsp;+
            </button>{" "}
            <CachedOutlinedIcon
              style={{
                fontSize: "35px",
                padding: "2px 4px",
                border: "2px solid #e8ededff",
                fontWeight: 500,
                backgroundColor: "white",
                borderRadius: "6px",
                cursor: "pointer",
                color: "#7b8694ff",
              }}
              //   className="menu-icon"
            />
            <MoreVertSharpIcon
              style={{
                fontSize: "35px",
                padding: "2px 4px",
                border: "2px solid #e8ededff",
                fontWeight: 500,
                backgroundColor: "white",
                borderRadius: "6px",
                cursor: "pointer",
                color: "#7b8694ff",
              }}
            />
            <div
              style={{
                display: "flex",
                border: "1px solid #7676b0ff",
                alignItems: "center",
                justifyContent: "center",
                gap: "2px",
                borderRadius: "4px",
                backgroundColor: "white",
                padding: "4px",
              }}
            >
              <AccessTimeFilledSharpIcon style={{ color: "#7676b0ff" }} />
              <Divider orientation="vertical" variant="middle" flexItem />
              <p style={{ fontSize: "12px" }}>Last 2 days </p>
              <KeyboardArrowDownIcon />
            </div>
          </div>
        </div>{" "}
        {data?.categories.map((cate, index) => (
          <div key={cate.id} className="mb-22">
            <h4 className="mb-6">{cate.name}</h4>
            <div className="widget-align">
              {(filteredWidgets?.[cate.name] || cate?.widgets)
                .filter((widget) => widget.show) // Filter widgets based on the "show" field
                .map((widget, idx) => (
                  <WidgetCard
                    key={idx}
                    widget={widget}
                    category={cate}
                    onDelete={handleDeleteWidget} // Ensure this is passed
                  />
                ))}
              <div
                className="widget-card"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <button
                  className="widget-button"
                  onClick={() => handleOpenDrawer(index)}
                >
                  +&nbsp;&nbsp;&nbsp; Add Widget
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <DashboardDrawer
        isOpen={open}
        onClose={handleCloseDrawer}
        selectedCategoryIndex={selectedCategoryIndex}
        setData={setData}
        data={data}
      />
    </div>
  );
}

export default DashboardWidget;
