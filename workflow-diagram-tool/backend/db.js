// backend/db.js
let workflowsStore = {
  main: {
    nodes: [
      { id: 'node-1', data: { label: 'Main Workflow - Step 1' }, position: { x: 100, y: 100 }, type: 'default' },
      { id: 'node-2', data: { label: 'Step with Sub-Workflow' }, position: { x: 300, y: 100 }, type: 'default', subWorkflowId: 'subWorkflow1' },
    ],
    edges: [{ id: 'edge-1-2', source: 'node-1', target: 'node-2' }],
  },
  subWorkflow1: {
    nodes: [
      { id: 'sub-node-1', data: { label: 'Sub-Workflow - Step A' }, position: { x: 100, y: 150 }, type: 'default' },
      { id: 'sub-node-2', data: { label: 'Sub-Workflow - Step B' }, position: { x: 300, y: 150 }, type: 'default' },
    ],
    edges: [{ id: 'sub-edge-1-2', source: 'sub-node-1', target: 'sub-node-2' }],
  },
};

module.exports = { workflowsStore };
