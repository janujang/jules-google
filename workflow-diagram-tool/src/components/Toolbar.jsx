import React from "react";

const Toolbar = ({ addNode, saveWorkflow }) => {
  return (
    <div className="toolbar">
      <h2
        style={{
          fontSize: "1rem",
          color: "var(--text-secondary)",
          marginTop: 0,
          marginBottom: "16px",
        }}
      >
        Tools
      </h2>
      <button className="primary" onClick={addNode}>
        Add Task Node
      </button>
      <button onClick={saveWorkflow}>Save Workflow</button>
      <div
        style={{
          marginTop: "auto",
          borderTop: "1px solid var(--border-color)",
          paddingTop: "16px",
        }}
      >
        <span
          style={{
            fontSize: "0.8rem",
            color: "var(--text-secondary)",
            display: "block",
            marginBottom: "8px",
          }}
        >
          Tip: Double-click a node to explore sub-workflows
        </span>
      </div>
    </div>
  );
};

export default Toolbar;
