import React from "react";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-900">
          Workflow Designer
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Workspace</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
