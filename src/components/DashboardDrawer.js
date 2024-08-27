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
      <Box sx={{ width: 800 }} role="presentation">
        <div className="drawer-title">
          <p>Add Widget</p>
          <CloseIcon className="close-icon" onClick={onClose} />
        </div>
        <DashboardTab
          selectedCategoryIndex={selectedCategoryIndex}
          onWidgetSelection={onWidgetSelection}
          selectedWidgets={selectedWidgets}
        />
      </Box>
    </Drawer>
  );
}

export default DashboardDrawer;
