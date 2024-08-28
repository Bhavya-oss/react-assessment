import React, { useEffect, useState } from "react";
import { Drawer, Box } from "@mui/material";
import DashboardTab from "./DashBoardTab";
import CloseIcon from "@mui/icons-material/Close";

function DashboardDrawer({
  isOpen,
  onClose,
  selectedCategoryIndex,
  setData,
  data,
}) {
  const [localSelectedWidgets, setLocalSelectedWidgets] = useState({});

  useEffect(() => {
    const initialSelectedWidgets = {};
    data.categories.forEach((category) => {
      const shownWidgets = category.widgets.filter((widget) => widget.show);
      initialSelectedWidgets[category.name] = shownWidgets.map(
        (widget) => widget.name
      );
    });
    setLocalSelectedWidgets(initialSelectedWidgets);
  }, [data, isOpen]);

  const handleWidgetSelection = (categoryName, widget, isSelected) => {
    setLocalSelectedWidgets((prev) => {
      const updatedCategoryWidgets = isSelected
        ? [...(prev[categoryName] || []), widget.name]
        : (prev[categoryName] || []).filter((name) => name !== widget.name);

      return {
        ...prev,
        [categoryName]: updatedCategoryWidgets,
      };
    });
  };

  const handleSubmit = () => {
    const updatedData = { ...data };

    updatedData.categories.forEach((category) => {
      const selectedWidgetsInCategory =
        localSelectedWidgets[category.name] || [];
      category.widgets.forEach((widget) => {
        widget.show = selectedWidgetsInCategory.includes(widget.name);
      });
    });

    setData(updatedData);
    onClose();
  };

  return (
    <Drawer open={isOpen} onClose={onClose} anchor="right">
      <Box
        sx={{
          width: 800,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        role="presentation"
      >
        <div>
          <div className="drawer-title">
            <p>Add Widget</p>
            <CloseIcon className="close-icon" onClick={onClose} />
          </div>
          <p className="personalize-dashboard">
            Personalize your Dashboard by adding the following widget
          </p>
          <DashboardTab
            selectedCategoryIndex={selectedCategoryIndex}
            onWidgetSelection={handleWidgetSelection}
            selectedWidgets={localSelectedWidgets}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            padding: "16px",
          }}
        >
          <button
            className="cancel-text drawer-button background-cancel"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="confirm-text drawer-button background-color"
            onClick={handleSubmit}
          >
            Confirm
          </button>
        </div>
      </Box>
    </Drawer>
  );
}

export default DashboardDrawer;
