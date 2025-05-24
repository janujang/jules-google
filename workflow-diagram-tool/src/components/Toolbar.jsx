import React from 'react';

const Toolbar = ({ addNode, saveWorkflow }) => {
  return (
    <div style={{ width: '200px', backgroundColor: '#e0e0e0', padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <button onClick={addNode}>Add Task Node</button>
      <button onClick={saveWorkflow}>Save Current Workflow</button>
    </div>
  );
};

export default Toolbar;
