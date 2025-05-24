import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import WorkflowCanvas from './components/WorkflowCanvas';
import { applyNodeChanges, applyEdgeChanges, addEdge } from 'reactflow';
import './App.css';

const API_BASE_URL = 'http://localhost:3001/api';

// Fallback initial state if API fetch fails
const fallbackInitialWorkflows = {
  main: {
    nodes: [
      { id: 'node-1', data: { label: 'Fallback Main - Step 1' }, position: { x: 100, y: 100 }, type: 'default' },
      { id: 'node-2', data: { label: 'Fallback Sub-Workflow Node' }, position: { x: 300, y: 100 }, type: 'default', subWorkflowId: 'subWorkflow1' },
    ],
    edges: [{ id: 'edge-1-2', source: 'node-1', target: 'node-2' }],
  },
  subWorkflow1: {
    nodes: [
      { id: 'sub-node-1', data: { label: 'Fallback Sub - Step A' }, position: { x: 100, y: 150 }, type: 'default' },
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
          throw new Error(`Failed to fetch workflows: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        if (Object.keys(data).length === 0) {
          // If backend returns empty, use fallback
          setWorkflows(fallbackInitialWorkflows);
          setCurrentWorkflowId('main');
          setHistory(['main']);
          setError('No workflows found on server, loaded fallback data.');
        } else {
          setWorkflows(data);
          const firstWorkflowId = Object.keys(data)[0] || 'main'; // Default to 'main' or first available
          setCurrentWorkflowId(firstWorkflowId);
          setHistory([firstWorkflowId]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(`Error fetching workflows: ${err.message}. Using fallback data.`);
        setWorkflows(fallbackInitialWorkflows);
        setCurrentWorkflowId('main'); // Fallback to 'main'
        setHistory(['main']);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkflows();
  }, []);

  const navigateToWorkflow = useCallback((workflowId) => {
    if (workflows[workflowId]) {
      setCurrentWorkflowId(workflowId);
      setHistory((prevHistory) => [...prevHistory, workflowId]);
    } else {
      alert(`Workflow "${workflowId}" not found.`);
    }
  }, [workflows]);

  const navigateBack = useCallback(() => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      const previousWorkflowId = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      setCurrentWorkflowId(previousWorkflowId);
    }
  }, [history]);

  const currentWorkflow = workflows[currentWorkflowId] || { nodes: [], edges: [] };

  const onNodesChange = useCallback(
    (changes) => {
      if (!currentWorkflowId) return;
      setWorkflows((prevWorkflows) => ({
        ...prevWorkflows,
        [currentWorkflowId]: {
          ...prevWorkflows[currentWorkflowId],
          nodes: applyNodeChanges(changes, prevWorkflows[currentWorkflowId]?.nodes || []),
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
          edges: applyEdgeChanges(changes, prevWorkflows[currentWorkflowId]?.edges || []),
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
          edges: addEdge(connection, prevWorkflows[currentWorkflowId]?.edges || []),
        },
      }));
    },
    [currentWorkflowId, setWorkflows]
  );

  const addNode = useCallback(() => {
    if (!currentWorkflowId) return;
    const newNodeId = `node_${currentWorkflowId}_${Math.random().toString(36).substr(2, 9)}`;
    const newNode = {
      id: newNodeId,
      type: 'default',
      data: { label: 'New Task' },
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
      alert('No active workflow to save.');
      return;
    }
    try {
      const payload = {
        nodes: workflows[currentWorkflowId].nodes,
        edges: workflows[currentWorkflowId].edges,
      };
      const response = await fetch(`${API_BASE_URL}/workflows/${currentWorkflowId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to save workflow: ${response.status}`);
      }
      const result = await response.json();
      alert(result.message || 'Workflow saved successfully!');
    } catch (err) {
      console.error("Save error:", err);
      alert(`Error saving workflow: ${err.message}`);
    }
  }, [currentWorkflowId, workflows]);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading workflows...</div>;
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      {error && <div style={{ color: 'red', textAlign: 'center', padding: '10px' }}>{error}</div>}
      {history.length > 1 && (
        <button onClick={navigateBack} style={{ margin: '10px', padding: '5px 10px', alignSelf: 'flex-start' }}>
          Back
        </button>
      )}
      <div style={{ display: 'flex', flexGrow: 1 }}>
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
          <div style={{ flexGrow: 1, textAlign: 'center', padding: '20px' }}>
            {currentWorkflowId ? `Workflow "${currentWorkflowId}" not found or empty.` : 'No workflow selected.'}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
