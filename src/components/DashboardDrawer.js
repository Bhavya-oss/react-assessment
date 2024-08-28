import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Drawer, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { updateData } from "../components/DashboardSlice";
import DashBoardTab from "../components/DashBoardTab";
function DashboardDrawer({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.dashboard.data);
  const selectedCategoryIndex = useSelector(
    (state) => state.dashboard.selectedCategoryIndex
  );
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

    dispatch(updateData(updatedData));
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: { width: 300, padding: 2 },
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h3>Dashboard Widgets</h3>
        <CloseIcon onClick={onClose} style={{ cursor: "pointer" }} />
      </Box>
      <DashBoardTab
        categories={data.categories}
        selectedCategoryIndex={selectedCategoryIndex}
        localSelectedWidgets={localSelectedWidgets}
        onWidgetSelect={handleWidgetSelection}
      />
      <Box display="flex" justifyContent="center" marginTop={2}>
        <button className="submit-button" onClick={handleSubmit}>
          Save Changes
        </button>
      </Box>
    </Drawer>
  );
}

export default DashboardDrawer;
