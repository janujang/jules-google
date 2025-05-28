import React from "react";

const Header = () => {
  return (
    <header className="header">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Workflow Designer</h1>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
            Workspace
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
