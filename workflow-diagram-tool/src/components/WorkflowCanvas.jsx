import React, { useCallback } from "react";
import ReactFlow, { Controls, Background } from "reactflow";
import "reactflow/dist/style.css";

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
      } else if (node.subWorkflowId) {
        // Checking both node.data and node directly for subWorkflowId
        navigateToWorkflow(node.subWorkflowId);
      }
    },
    [navigateToWorkflow]
  );

  return (
    <div className="flex-1 h-full bg-gray-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDoubleClick={onNodeDoubleClick}
        fitView
        className="[&_.react-flow__node]:shadow-md [&_.react-flow__node]:transition-transform [&_.react-flow__node:hover]:translate-y-[-2px] [&_.react-flow__node:hover]:shadow-lg"
      >
        <Controls className="[&_button]:border-gray-200 [&_button]:bg-white [&_button]:shadow-sm" />
        <Background className="[&_path]:stroke-gray-200" />
      </ReactFlow>
    </div>
  );
};

export default WorkflowCanvas;
