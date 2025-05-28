import React, { useState, useCallback, useEffect } from "react";
import Header from "./components/Header";
import Toolbar from "./components/Toolbar";
import WorkflowCanvas from "./components/WorkflowCanvas";
import { applyNodeChanges, applyEdgeChanges, addEdge } from "reactflow";
const API_BASE_URL = "http://localhost:3001/api";

// Fallback initial state if API fetch fails
const fallbackInitialWorkflows = {
  main: {
    nodes: [
      {
        id: "node-1",
        data: { label: "Fallback Main - Step 1" },
        position: { x: 100, y: 100 },
        type: "default",
      },
      {
        id: "node-2",
        data: { label: "Fallback Sub-Workflow Node" },
        position: { x: 300, y: 100 },
        type: "default",
        subWorkflowId: "subWorkflow1",
      },
    ],
    edges: [{ id: "edge-1-2", source: "node-1", target: "node-2" }],
  },
  subWorkflow1: {
    nodes: [
      {
        id: "sub-node-1",
        data: { label: "Fallback Sub - Step A" },
        position: { x: 100, y: 150 },
        type: "default",
      },
    ],
    edges: [],
  },
};

function App() {
  const [workflows, setWorkflows] = useState({});
  const [currentWorkflowId, setCurrentWorkflowId] = useState(null); // Initialize to null
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch initial data
  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE_URL}/workflows`);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch workflows: ${response.status} ${response.statusText}`
          );
        }
        const data = await response.json();
        if (Object.keys(data).length === 0) {
          // If backend returns empty, use fallback
          setWorkflows(fallbackInitialWorkflows);
          setCurrentWorkflowId("main");
          setHistory(["main"]);
          setError("No workflows found on server, loaded fallback data.");
        } else {
          setWorkflows(data);
          const firstWorkflowId = Object.keys(data)[0] || "main"; // Default to 'main' or first available
          setCurrentWorkflowId(firstWorkflowId);
          setHistory([firstWorkflowId]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(
          `Error fetching workflows: ${err.message}. Using fallback data.`
        );
        setWorkflows(fallbackInitialWorkflows);
        setCurrentWorkflowId("main"); // Fallback to 'main'
        setHistory(["main"]);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkflows();
  }, []);

  const navigateToWorkflow = useCallback(
    (workflowId) => {
      if (workflows[workflowId]) {
        setCurrentWorkflowId(workflowId);
        setHistory((prevHistory) => [...prevHistory, workflowId]);
      } else {
        alert(`Workflow "${workflowId}" not found.`);
      }
    },
    [workflows]
  );

  const navigateBack = useCallback(() => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      const previousWorkflowId = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      setCurrentWorkflowId(previousWorkflowId);
    }
  }, [history]);

  const currentWorkflow = workflows[currentWorkflowId] || {
    nodes: [],
    edges: [],
  };

  const onNodesChange = useCallback(
    (changes) => {
      if (!currentWorkflowId) return;
      setWorkflows((prevWorkflows) => ({
        ...prevWorkflows,
        [currentWorkflowId]: {
          ...prevWorkflows[currentWorkflowId],
          nodes: applyNodeChanges(
            changes,
            prevWorkflows[currentWorkflowId]?.nodes || []
          ),
        },
      }));
    },
    [currentWorkflowId, setWorkflows]
  );

  const onEdgesChange = useCallback(
    (changes) => {
      if (!currentWorkflowId) return;
      setWorkflows((prevWorkflows) => ({
        ...prevWorkflows,
        [currentWorkflowId]: {
          ...prevWorkflows[currentWorkflowId],
          edges: applyEdgeChanges(
            changes,
            prevWorkflows[currentWorkflowId]?.edges || []
          ),
        },
      }));
    },
    [currentWorkflowId, setWorkflows]
  );

  const onConnect = useCallback(
    (connection) => {
      if (!currentWorkflowId) return;
      setWorkflows((prevWorkflows) => ({
        ...prevWorkflows,
        [currentWorkflowId]: {
          ...prevWorkflows[currentWorkflowId],
          edges: addEdge(
            connection,
            prevWorkflows[currentWorkflowId]?.edges || []
          ),
        },
      }));
    },
    [currentWorkflowId, setWorkflows]
  );

  const addNode = useCallback(() => {
    if (!currentWorkflowId) return;
    const newNodeId = `node_${currentWorkflowId}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    const newNode = {
      id: newNodeId,
      type: "default",
      data: { label: "New Task" },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    };
    setWorkflows((prevWorkflows) => ({
      ...prevWorkflows,
      [currentWorkflowId]: {
        ...prevWorkflows[currentWorkflowId],
        nodes: (prevWorkflows[currentWorkflowId]?.nodes || []).concat(newNode),
      },
    }));
  }, [currentWorkflowId, setWorkflows]);

  const saveCurrentWorkflow = useCallback(async () => {
    if (!currentWorkflowId || !workflows[currentWorkflowId]) {
      alert("No active workflow to save.");
      return;
    }
    try {
      const payload = {
        nodes: workflows[currentWorkflowId].nodes,
        edges: workflows[currentWorkflowId].edges,
      };
      const response = await fetch(
        `${API_BASE_URL}/workflows/${currentWorkflowId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `Failed to save workflow: ${response.status}`
        );
      }
      const result = await response.json();
      alert(result.message || "Workflow saved successfully!");
    } catch (err) {
      console.error("Save error:", err);
      alert(`Error saving workflow: ${err.message}`);
    }
  }, [currentWorkflowId, workflows]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px] text-gray-500">
        <div>
          <div className="mb-3">Loading workflows...</div>
          <div className="h-0.5 bg-gray-200 rounded overflow-hidden">
            <div className="h-full w-1/3 bg-blue-600 animate-loading-progress" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <Header />
      {error && (
        <div className="flex items-center gap-2 p-3 mx-2 mt-2 text-red-600 bg-red-50 rounded-lg">
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z"
              fill="currentColor"
            />
          </svg>
          {error}
        </div>
      )}
      {history.length > 1 && (
        <button
          onClick={navigateBack}
          className="inline-flex items-center gap-2 m-4 px-3 py-2 text-sm text-gray-700 hover:text-gray-900 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
            <path
              d="M15 8H1M1 8L8 15M1 8L8 1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </button>
      )}
      <div className="flex flex-1 relative">
        <Toolbar addNode={addNode} saveWorkflow={saveCurrentWorkflow} />
        {currentWorkflowId && workflows[currentWorkflowId] ? (
          <WorkflowCanvas
            key={currentWorkflowId}
            nodes={currentWorkflow.nodes}
            edges={currentWorkflow.edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            navigateToWorkflow={navigateToWorkflow}
          />
        ) : (
          <div className="flex-1 text-center p-5 text-gray-500">
            {currentWorkflowId
              ? `Workflow "${currentWorkflowId}" not found or empty.`
              : "No workflow selected."}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
