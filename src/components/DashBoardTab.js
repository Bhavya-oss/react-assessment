import React, { useState, useEffect } from "react";
import { Box, Tabs, Tab, Checkbox, FormControlLabel } from "@mui/material";
import dashBoardData from "../assets/data.json";

function DashboardTab({
  selectedCategoryIndex,
  onWidgetSelection,
  selectedWidgets,
}) {
  const [activeTab, setActiveTab] = useState(selectedCategoryIndex);

  useEffect(() => {
    setActiveTab(selectedCategoryIndex);
  }, [selectedCategoryIndex]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleCheckboxChange = (category, widget, event) => {
    onWidgetSelection(category.name, widget, event.target.checked);
  };

  return (
    <>
      <Box sx={{ width: "74%", p: "8px" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="dashboard tabs"
          >
            {dashBoardData.categories.map((category, index) => (
              <Tab
                key={index}
                label={category.name.split(" ")[0]}
                sx={{
                  fontWeight: activeTab === index ? "bold" : "normal",
                  textTransform: "none",
                }}
              />
            ))}
          </Tabs>
        </Box>
      </Box>

      <Box sx={{ padding: 2 }}>
        {dashBoardData.categories.map((category, index) => (
          <Box
            key={index}
            sx={{ display: activeTab === index ? "block" : "none" }}
          >
            {category.widgets.map((widget, idx) => (
              <div className="checkbox-wrap" key={idx}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={(selectedWidgets[category.name] || []).some(
                        (w) => w.name === widget.name
                      )}
                      onChange={(event) =>
                        handleCheckboxChange(category, widget, event)
                      }
                      value={widget.name}
                    />
                  }
                  label={widget.name}
                />
              </div>
            ))}
          </Box>
        ))}
      </Box>
    </>
  );
}

export default DashboardTab;
