import React, { useRef } from 'react';
import { MindMapCanvas, MindMapCanvasRef } from './components/MindMapCanvas';
import { Toolbar } from './components/Toolbar';
import { useMindMap } from './hooks/useMindMap';
import { LanguageProvider, useLanguage } from './hooks/useLanguage';
import './styles/App.css';

const AppContent: React.FC = () => {
  const { nodes, connections, addNode, addOrphanNode, addConnection, updateNode, deleteNode, resetMap, onNodesChange } = useMindMap();
  const {language } = useLanguage();
  const canvasRef = useRef<MindMapCanvasRef>(null);

  const handleAddNode = () => {
    addNode(); // Adds as child of root
  };

  const handleAddOrphanNode = () => {
    addOrphanNode(); // Adds as orphan node (no connection)
  };

  const handleNewMap = () => {
    const confirmMessage = language === 'pt' 
      ? 'Tem certeza que deseja criar um novo mapa? Todos os dados serão perdidos.'
      : 'Are you sure you want to create a new map? All data will be lost.';
    
    if (window.confirm(confirmMessage)) {
      resetMap();
    }
  };


  return (
    <div className="app">
      <Toolbar
        onAddNode={handleAddNode}
        onAddOrphanNode={handleAddOrphanNode}
        onNewMap={handleNewMap}
      />
      <MindMapCanvas
        ref={canvasRef}
        nodes={nodes}
        connections={connections}
        onNodesChange={onNodesChange}
        onUpdateNode={updateNode}
        onDeleteNode={deleteNode}
        onAddChild={addNode}
        onAddConnection={addConnection}
      />
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;

