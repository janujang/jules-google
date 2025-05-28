import React from "react";

const Toolbar = ({ addNode, saveWorkflow }) => {
  return (
    <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg p-2 flex flex-col gap-3 z-20">
      <button
        className="p-3 hover:bg-gray-100 rounded-lg group transition-colors"
        onClick={addNode}
        title="Add Task Node"
      >
        <svg
          className="w-5 h-5 text-gray-700"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      <button
        className="p-3 hover:bg-gray-100 rounded-lg group transition-colors"
        onClick={saveWorkflow}
        title="Save Workflow"
      >
        <svg
          className="w-5 h-5 text-gray-700"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
          <polyline points="17 21 17 13 7 13 7 21" />
          <polyline points="7 3 7 8 15 8" />
        </svg>
      </button>

      <div className="border-t border-gray-200 my-1"></div>

      <div className="relative group">
        <button
          className="p-3 hover:bg-gray-100 rounded-lg transition-colors"
          title="Help"
        >
          <svg
            className="w-5 h-5 text-gray-700"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </button>
        <div className="absolute left-full ml-2 top-0 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Double-click a node to explore sub-workflows
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
