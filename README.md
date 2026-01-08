# MaPa - Mind Map Web Application

A modern, client-side mind map application built with React and TypeScript. Create, edit, and export mind maps without any authentication required.

## Features

- 🎨 **Interactive Mind Maps**: Create and edit nodes with drag-and-drop functionality.
- 🎯 **Node Management**: Add, delete, and edit nodes with a context menu.
- 🎨 **Customization**: Change node colors.
- 🔍 **Zoom & Pan**: Navigate large mind maps with zoom and pan controls.
- 📥 **Export Options**: Export your mind maps as PNG or PDF files.
- 💾 **Client-Side Only**: No backend required, all data stays in your browser.
- 🌐 **i18n Support**: Available in English and Portuguese.

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

- **Double-click** a node to edit its text.
- **Right-click** a node to open the context menu.
- From the context menu, you can:
    - Add a child node.
    - Delete the node (root node cannot be deleted).
    - Change the node's color.
- **Drag** nodes to reposition them.
- Use the **toolbar** to:
    - Add a new child or orphan node using the "Add Node" dropdown.
    - Create a new map.
    - Switch the language.

## Export

- Use the **Export** dropdown in the toolbar to export your mind map.
- **as PNG**: To download your mind map as a PNG image.
- **as PDF**: To download your mind map as a PDF document.

## Technologies

- React 18
- TypeScript
- React Flow
- Vite
- html2canvas
- jsPDF

## License

MIT

