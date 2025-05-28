import React from "react";
import { PlusSquare, Save, HelpCircle } from 'lucide-react';

const Toolbar = ({ addNode, saveWorkflow }) => {
  return (
    <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg p-2 flex flex-col gap-3 z-20">
      <button
        className="p-3 hover:bg-gray-100 rounded-lg group transition-colors"
        onClick={addNode}
        title="Add Task Node"
      >
        <PlusSquare className="w-5 h-5 text-gray-700" />
      </button>
      
      <button
        className="p-3 hover:bg-gray-100 rounded-lg group transition-colors"
        onClick={saveWorkflow}
        title="Save Workflow"
      >
        <Save className="w-5 h-5 text-gray-700" />
      </button>

      <div className="border-t border-gray-200 my-1"></div>

      <div className="relative group">
        <button
          className="p-3 hover:bg-gray-100 rounded-lg transition-colors"
          title="Help"
        >
          <HelpCircle className="w-5 h-5 text-gray-700" />
        </button>
        <div className="absolute left-full ml-2 top-0 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Double-click a node to explore sub-workflows
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
