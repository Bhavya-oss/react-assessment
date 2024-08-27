import React, { useState, useMemo } from "react";
import WIDGETDATA from "../assets/data.json";
import DashboardDrawer from "./DashboardDrawer";
import WidgetCard from "./WidgetCard";
import { TextField, Autocomplete } from "@mui/material";

function DashboardWidget() {
  const [open, setOpen] = useState(false);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedWidgets, setSelectedWidgets] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSearchChange = (event, value) => {
    setSearchTerm(value || event.target.value);
  };

  return (
    <div>
      <Autocomplete
        freeSolo
        options={allWidgetNames}
        value={searchTerm}
        onInputChange={handleSearchChange} // Handle both typing and selection from dropdown
        renderInput={(params) => (
          <TextField {...params} label="Search Widgets" variant="outlined" />
        )}
      />

      {WIDGETDATA.categories.map((cate, index) => (
        <div key={cate.id}>
          <h2>{cate.name}</h2>
          <div className="widget-align">
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
