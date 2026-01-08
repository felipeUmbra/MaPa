# MaPa - Mind Map Web Application

A modern, client-side mind map application built with React and TypeScript. Create, edit, and export mind maps without any authentication required.

## Features

- 🎨 **Interactive Mind Maps**: Create and edit nodes with drag-and-drop functionality
- 🎯 **Node Management**: Add, delete, and edit nodes with inline text editing
- 🎨 **Customization**: Change node colors and customize appearance
- 🔍 **Zoom & Pan**: Navigate large mind maps with zoom and pan controls
- 📥 **Export Options**: Export your mind maps as PNG or PDF files
- 💾 **Client-Side Only**: No backend required, all data stays in your browser

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

- **Double-click** a node to edit its text
- **Click** a node to select it and see editing options
- **Drag** nodes to reposition them
- Use the **toolbar** to add new nodes, zoom, and export
- **Color picker** appears when a node is selected
- Click **+** button on a selected node to add a child node
- Click **×** button to delete a node (root node cannot be deleted)

## Export

- **PNG Export**: Click "Export PNG" to download your mind map as a PNG image
- **PDF Export**: Click "Export PDF" to download your mind map as a PDF document

## Technologies

- React 18
- TypeScript
- React Flow
- Vite
- html2canvas
- jsPDF

## License

MIT

