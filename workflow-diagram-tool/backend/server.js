const express = require('express');
const cors = require('cors');
const { workflowsStore } = require('./db'); // Import the in-memory store

const app = express();
const port = process.env.PORT || 3001;

// Configure CORS to allow requests from the frontend development server
const corsOptions = {
  origin: 'http://localhost:5173', // Adjust if your frontend runs on a different port
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json()); // Middleware to parse JSON request bodies

// --- API Endpoints ---

// GET /api/workflows - Retrieve all workflows
app.get('/api/workflows', (req, res) => {
  res.json(workflowsStore);
});

// GET /api/workflows/:workflowId - Retrieve a specific workflow
app.get('/api/workflows/:workflowId', (req, res) => {
  const { workflowId } = req.params;
  const workflow = workflowsStore[workflowId];
  if (workflow) {
    res.json(workflow);
  } else {
    res.status(404).json({ message: `Workflow with ID '${workflowId}' not found.` });
  }
});

// POST /api/workflows/:workflowId - Save/Update a specific workflow
app.post('/api/workflows/:workflowId', (req, res) => {
  const { workflowId } = req.params;
  const { nodes, edges } = req.body;

  if (!nodes || !edges) {
    return res.status(400).json({ message: 'Invalid workflow data. Nodes and edges are required.' });
  }

  console.log(`Received data for workflow ${workflowId}:`, req.body);

  // Update or create the workflow
  workflowsStore[workflowId] = {
    nodes,
    edges,
  };

  res.status(200).json({
    message: `Workflow '${workflowId}' saved successfully.`,
    workflow: workflowsStore[workflowId],
  });
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
