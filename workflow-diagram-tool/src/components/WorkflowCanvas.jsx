import React, { useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
} from 'reactflow';
import 'reactflow/dist/style.css';

const WorkflowCanvas = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  navigateToWorkflow,
  // currentWorkflowId // Not strictly needed here but good for context if debugging
}) => {
  const onNodeDoubleClick = useCallback(
    (event, node) => {
      if (node.data.subWorkflowId) {
        navigateToWorkflow(node.data.subWorkflowId);
      } else if (node.subWorkflowId) { // Checking both node.data and node directly for subWorkflowId
        navigateToWorkflow(node.subWorkflowId);
      }
    },
    [navigateToWorkflow]
  );

  return (
    <div style={{ flexGrow: 1, height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDoubleClick={onNodeDoubleClick} // Changed to onNodeDoubleClick
        fitView
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default WorkflowCanvas;
