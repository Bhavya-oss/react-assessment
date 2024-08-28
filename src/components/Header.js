import { TextField } from "@mui/material";
import React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
function Header({ searchTerm, handleSearchChange }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "6px",
      }}
    >
      <p>Home </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid #deecffff",
          padding: "4px",
          borderRadius: "4px",
          width: "300px",
          backgroundColor: "#f0f5faff",
        }}
      >
        <SearchOutlinedIcon />
        <input
          variant="outlined"
          sx={{
            border: "none",
          }}
          placeholder="search anything..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
}

export default Header;
