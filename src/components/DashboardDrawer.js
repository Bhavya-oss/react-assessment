import React from "react";
import { Drawer, Box } from "@mui/material";
import DashboardTab from "./DashBoardTab";
import CloseIcon from "@mui/icons-material/Close";

function DashboardDrawer({
  isOpen,
  onClose,
  selectedCategoryIndex,
  onWidgetSelection,
  selectedWidgets,
}) {
  return (
    <Drawer open={isOpen} onClose={onClose} anchor="right">
      <Box
        sx={{
          width: 800,
          height: "100%", // Make the drawer take up the full height
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between", // Space out content to push buttons to the bottom
        }}
        role="presentation"
      >
        <div>
          <div className="drawer-title">
            <p>Add Widget</p>
            <CloseIcon className="close-icon" onClick={onClose} />
          </div>
          <p className="personalize-dashboard">
            Personalise your Dashboard by adding the following widget
          </p>
          <DashboardTab
            selectedCategoryIndex={selectedCategoryIndex}
            onWidgetSelection={onWidgetSelection}
            selectedWidgets={selectedWidgets}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end", // Align buttons to the right
            gap: "10px",
            padding: "16px", // Add padding for spacing from the edges
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
            onClick={onClose}
          >
            Confirm
          </button>
        </div>
      </Box>
    </Drawer>
  );
}

export default DashboardDrawer;
