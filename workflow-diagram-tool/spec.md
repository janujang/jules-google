# Workflow Diagram Tool Specification

## Overview

A whiteboard-style workflow diagram tool that combines Zoom's whiteboard functionality with the ability to create nested, explorable workflows.

## Core Features to Implement

### 1. Selection and Manipulation Tools

- [ ] Select tool (cursor)
  - Single select
  - Multi-select with drag or Shift+click
  - Box selection
  - Move selected items
  - Delete selected items
- [ ] Resize handles for shapes and nodes
- [ ] Rotation handles
- [ ] Copy/Paste functionality
- [ ] Undo/Redo support

### 2. Shape Tools

- [ ] Basic shapes
  - Rectangle
  - Circle/Oval
  - Triangle
  - Diamond (for decision nodes)
- [ ] Shape customization
  - Fill color
  - Border color and width
  - Corner radius for rectangles
  - Opacity settings

### 3. Connection Tools

- [ ] Line tool with multiple styles
  - Straight lines
  - Curved lines
  - Angled/orthogonal lines
  - Arrows and other line endings
- [ ] Line customization
  - Line color
  - Line thickness
  - Line style (solid, dashed, dotted)
- [ ] Smart connectors that stay attached to shapes

### 4. Text Tools

- [ ] Add text anywhere on canvas
- [ ] Text within shapes
- [ ] Text editing capabilities
  - Font size
  - Font style
  - Text alignment
  - Text color
- [ ] Auto-resize shapes to fit text

### 5. Nested Workflow Features

- [ ] Double-click to explore nested workflows
- [ ] Breadcrumb navigation
- [ ] Visual indicator for nodes with nested content
- [ ] Preview of nested workflow on hover
- [ ] Export/Import nested workflows

### 6. Canvas Controls

- [ ] Zoom in/out
- [ ] Pan canvas
- [ ] Fit to screen
- [ ] Mini-map for navigation
- [ ] Grid and snap-to-grid
- [ ] Rulers and guidelines

### 7. Collaboration Features (Future)

- [ ] Real-time collaboration
- [ ] User cursors
- [ ] Changes history
- [ ] Comments and annotations

## Technical Implementation Plan

### Phase 1: Basic Tools and Canvas

1. Implement toolbar with basic tools
2. Add shape creation functionality
3. Implement selection and manipulation
4. Add basic text support

### Phase 2: Advanced Features

1. Add connection tools and smart connectors
2. Implement shape and text customization
3. Add canvas controls
4. Implement undo/redo

### Phase 3: Nested Workflow Enhancement

1. Improve nested workflow navigation
2. Add preview features
3. Implement export/import
4. Add breadcrumb navigation

### Phase 4: Polish and Optimization

1. Add keyboard shortcuts
2. Optimize performance
3. Improve UX/UI
4. Add tutorials and help

## Technology Stack

### Frontend

- React for UI
- React Flow for base diagram functionality
- Lucide React for icons
- TailwindCSS for styling

### State Management

- React Context for local state
- Consider Redux/Zustand for complex state

### Backend

- Node.js/Express
- MongoDB/PostgreSQL for persistence
- WebSocket for real-time features (future)

## UI Components to Create

### Toolbar

- Tool selection buttons
- Property panels for selected items
- Color picker
- Line style selector
- Text formatting options

### Canvas

- Main drawing area
- Grid overlay
- Rulers
- Mini-map

### Navigation

- Breadcrumb trail
- Workflow hierarchy viewer
- History navigation

## Next Steps

1. Update toolbar with new tools
2. Implement basic shape creation
3. Add selection and manipulation
4. Implement text tools
5. Update data model to support new features
6. Add connection tools
7. Implement nested workflow improvements
