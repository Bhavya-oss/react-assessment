import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearchTerm,
  setSelectedCategoryIndex,
  toggleWidgetShow,
  setFilteredWidgets,
} from "../components/DashboardSlice";
import WidgetCard from "./WidgetCard";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import MoreVertSharpIcon from "@mui/icons-material/MoreVertSharp";
import AccessTimeFilledSharpIcon from "@mui/icons-material/AccessTimeFilledSharp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Divider from "@mui/joy/Divider";
import Header from "./Header";
import DashboardDrawer from "./DashboardDrawer";
import { toggleDrawer } from "../components/DashboardSlice";

function DashboardWidget() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.dashboard.data);
  const searchTerm = useSelector((state) => state.dashboard.searchTerm);
  const selectedCategoryIndex = useSelector(
    (state) => state.dashboard.selectedCategoryIndex
  );
  const isDrawerOpen = useSelector((state) => state.dashboard.isDrawerOpen);

  const handleOpenDrawer = (index) => {
    dispatch(setSelectedCategoryIndex(index));
  };

  const handleDeleteWidget = (categoryName, widgetName) => {
    dispatch(toggleWidgetShow({ categoryName, widgetName }));
  };

  const filteredWidgets = useMemo(() => {
    if (!searchTerm) {
      return data.categories
        .flatMap((c) => c.widgets)
        .filter((widget) => widget.show);
    }

    return data.categories
      .flatMap((c) => c.widgets)
      .filter(
        (widget) =>
          widget.show &&
          widget.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [searchTerm, data]);

  const handleSearchChange = (event) => {
    dispatch(setSearchTerm(event.target.value));
    dispatch(setFilteredWidgets(event.target.value));
  };

  const handleCloseDrawer = () => {
    dispatch(toggleDrawer());
  };

  return (
    <div>
      <Header searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <div className="main">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "97%",
          }}
        >
          <h3 style={{ marginBottom: "21px" }}>DNAPP Dashboard</h3>
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
            </button>
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
              <p style={{ fontSize: "12px" }}>Last 2 days</p>
              <KeyboardArrowDownIcon />
            </div>
          </div>
        </div>
        <div>
          {data?.categories.map((cate, index) => (
            <div key={cate.id} className="mb-22">
              <h4 className="mb-6">{cate.name}</h4>
              <div className="widget-align">
                {(filteredWidgets?.[cate.name] || cate?.widgets)
                  .filter((widget) => widget.show)
                  .map((widget, idx) => (
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
      <DashboardDrawer isOpen={isDrawerOpen} onClose={handleCloseDrawer} />{" "}
    </div>
  );
}

export default DashboardWidget;
