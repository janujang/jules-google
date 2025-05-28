import React from "react";

const Toolbar = ({ addNode, saveWorkflow }) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 p-5 flex flex-col gap-3 shadow-sm z-10">
      <h2 className="text-sm font-medium text-gray-500 mb-2">Tools</h2>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        onClick={addNode}
      >
        Add Task Node
      </button>
      <button
        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        onClick={saveWorkflow}
      >
        Save Workflow
      </button>
      <div className="mt-auto pt-4 border-t border-gray-200">
        <span className="text-xs text-gray-500 block">
          Tip: Double-click a node to explore sub-workflows
        </span>
      </div>
    </div>
  );
};

export default Toolbar;
