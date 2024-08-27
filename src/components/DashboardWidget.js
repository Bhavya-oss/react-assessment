import React, { useState, useMemo } from "react";
import WIDGETDATA from "../assets/data.json";
import DashboardDrawer from "./DashboardDrawer";
import WidgetCard from "./WidgetCard";
import { TextField, Autocomplete } from "@mui/material";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import MoreVertSharpIcon from "@mui/icons-material/MoreVertSharp";
import AccessTimeFilledSharpIcon from "@mui/icons-material/AccessTimeFilledSharp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Divider from "@mui/joy/Divider";

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

  const handleWidgetSelection = (categoryName, widget, isSelected) => {
    setSelectedWidgets((prevSelectedWidgets) => {
      const categoryWidgets = prevSelectedWidgets[categoryName] || [];

      if (isSelected) {
        return {
          ...prevSelectedWidgets,
          [categoryName]: [...categoryWidgets, widget],
        };
      } else {
        return {
          ...prevSelectedWidgets,
          [categoryName]: categoryWidgets.filter((w) => w.name !== widget.name),
        };
      }
    });
  };

  const handleDeleteWidget = (categoryName, widgetName) => {
    setSelectedWidgets((prevSelectedWidgets) => {
      const updatedCategoryWidgets = prevSelectedWidgets[categoryName].filter(
        (widget) => widget.name !== widgetName
      );

      return {
        ...prevSelectedWidgets,
        [categoryName]: updatedCategoryWidgets,
      };
    });
  };

  // Collect all widget names for Autocomplete
  const allWidgetNames = useMemo(() => {
    return WIDGETDATA.categories.flatMap((category) =>
      category.widgets.map((widget) => widget.name)
    );
  }, []);

  // Filter widgets based on search term
  const filteredWidgets = useMemo(() => {
    if (!searchTerm) return selectedWidgets;

    const filtered = {};
    for (const category in selectedWidgets) {
      filtered[category] = selectedWidgets[category].filter((widget) =>
        widget.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [searchTerm, selectedWidgets]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);

    // Filter categories based on the widget names
    setData((prev) => ({
      ...prev,
      categories: WIDGETDATA?.categories
        ?.map((category) => {
          // Filter widgets within each category
          const filteredWidgets = category.widgets?.filter((widget) =>
            widget.name
              ?.toLowerCase()
              ?.includes(event.target.value?.toLowerCase())
          );

          // Return the category with the filtered widgets
          return {
            ...category,
            widgets: filteredWidgets,
          };
        })
        .filter((category) => category.widgets.length > 0), // Only include categories that have widgets matching the search term
    }));
  };

  return (
    <div>
      <TextField
        label="Your Label"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <div className="main">
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
        </div>
        <div>
          {" "}
          {data?.categories.map((cate, index) => (
            <div className="mb-22" key={cate.id}>
              <h4 className="mb-6">{cate.name}</h4>
              <div className="widget-align ">
                {(filteredWidgets[cate.name] || []).map((widget, idx) => (
                  <WidgetCard
                    key={idx}
                    widget={widget}
                    category={cate}
                    onDelete={handleDeleteWidget}
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
      </div>
      <DashboardDrawer
        isOpen={open}
        onClose={handleCloseDrawer}
        selectedCategoryIndex={selectedCategoryIndex}
        onWidgetSelection={handleWidgetSelection}
        selectedWidgets={selectedWidgets}
      />
    </div>
  );
}

export default DashboardWidget;
