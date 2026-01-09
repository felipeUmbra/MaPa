import React, { useCallback, useRef, useImperativeHandle, forwardRef, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  NodeChange,
  Connection,
  ReactFlowInstance,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { CustomNode } from './Node';
import { ContextMenu } from './ContextMenu';
import { MindMapNode, MindMapConnection } from '../types/mindmap';
import { useLanguage } from '../hooks/useLanguage';

interface MindMapCanvasProps {
  nodes: MindMapNode[];
  connections: MindMapConnection[];
  onNodesChange: (changes: NodeChange[]) => void;
  onUpdateNode: (id: string, updates: Partial<MindMapNode>) => void;
  onDeleteNode: (id: string) => void;
  onAddChild: (parentId: string) => void;
  onAddConnection?: (source: string, target: string) => void;
}

export interface MindMapCanvasRef {
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  setZoom: (zoom: number) => void;
  getZoom: () => number;
}

const nodeTypes = {
  custom: CustomNode,
};

export const MindMapCanvas = forwardRef<MindMapCanvasRef, MindMapCanvasProps>(({
  nodes,
  connections,
  onNodesChange,
  onUpdateNode,
  onDeleteNode,
  onAddChild,
  onAddConnection,
}, ref) => {
  const { t } = useLanguage();
  const reactFlowInstance = useRef<ReactFlowInstance | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    nodeId: string;
  } | null>(null);
  const [showColorPicker, setShowColorPicker] = useState<string | null>(null);
  const [tempColor, setTempColor] = useState<string>('#4A90E2');

  const reactFlowNodes: Node[] = nodes.map((node) => ({
    id: node.id,
    type: 'custom',
    position: { x: node.x, y: node.y },
    data: {
      node,
      onUpdate: onUpdateNode,
      onDelete: onDeleteNode,
      onAddChild,
    },
    draggable: true,
  }));

  const reactFlowEdges: Edge[] = connections.map((conn) => ({
    id: conn.id,
    source: conn.source,
    target: conn.target,
    type: 'smoothstep',
    animated: false,
    style: { stroke: '#666', strokeWidth: 3 },
  }));

  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      onNodesChange(changes);
    },
    [onNodesChange]
  );

  const handleConnect = useCallback(
    (params: Connection) => {
      // Allow manual connections - multiple connections to same node are allowed
      if (params.source && params.target && onAddConnection) {
        onAddConnection(params.source, params.target);
      }
    },
    [onAddConnection]
  );

  const handleNodeContextMenu = useCallback((event: React.MouseEvent, node: Node) => {
    event.preventDefault();
    const point = reactFlowInstance.current?.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });
    
    if (point) {
      setContextMenu({
        x: event.clientX,
        y: event.clientY,
        nodeId: node.id,
      });
    }
  }, []);

  const handlePaneContextMenu = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    // Could add pane context menu here if needed
  }, []);

  const handleCloseContextMenu = useCallback(() => {
    setContextMenu(null);
    setShowColorPicker(null);
  }, []);

  const handleAddChildFromContext = useCallback(() => {
    if (contextMenu) {
      onAddChild(contextMenu.nodeId);
    }
  }, [contextMenu, onAddChild]);

  const handleChangeColorFromContext = useCallback(() => {
    if (contextMenu) {
      const node = nodes.find((n) => n.id === contextMenu.nodeId);
      setTempColor(node?.color || '#4A90E2');
      setShowColorPicker(contextMenu.nodeId);
    }
  }, [contextMenu, nodes]);

  const handleColorChange = useCallback((color: string) => {
    setTempColor(color);
  }, []);

  const handleColorConfirm = useCallback(() => {
    if (showColorPicker) {
      onUpdateNode(showColorPicker, { color: tempColor });
      setShowColorPicker(null);
      setContextMenu(null);
    }
  }, [showColorPicker, tempColor, onUpdateNode]);

  const handleColorCancel = useCallback(() => {
    setShowColorPicker(null);
    setContextMenu(null);
  }, []);

  const onInit = useCallback((instance: ReactFlowInstance) => {
    reactFlowInstance.current = instance;
  }, []);

useImperativeHandle(ref, () => ({
  zoomIn: () => {
    if (reactFlowInstance.current) {
      reactFlowInstance.current.zoomIn(); // Use o método nativo zoomIn
    }
  },
  zoomOut: () => {
    if (reactFlowInstance.current) {
      reactFlowInstance.current.zoomOut(); // Use o método nativo zoomOut
    }
  },
  resetZoom: () => {
    if (reactFlowInstance.current) {
      reactFlowInstance.current.fitView();
    }
  },
  setZoom: (zoom: number) => {
    if (reactFlowInstance.current) {
      const clampedZoom = Math.max(0.5, Math.min(2, zoom));
      reactFlowInstance.current.zoomTo(clampedZoom); // O nome correto é zoomTo
    }
  },
  getZoom: () => {
    return reactFlowInstance.current?.getZoom() || 1;
  },
}));

  return (
    <div id="mindmap-canvas" style={{ width: '100%', height: '100vh', backgroundColor: '#ffffff', position: 'relative' }}>
      <ReactFlow
        nodes={reactFlowNodes}
        edges={reactFlowEdges}
        onNodesChange={handleNodesChange}
        onConnect={handleConnect}
        onNodeContextMenu={handleNodeContextMenu}
        onPaneContextMenu={handlePaneContextMenu}
        onInit={onInit}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.5}
        maxZoom={2}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
      >
        <Background color="#e0e0e0" gap={16} />
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            const data = node.data as { node: MindMapNode };
            return data?.node?.color || '#4A90E2';
          }}
          maskColor="rgba(0, 0, 0, 0.1)"
        />
      </ReactFlow>
      
      {contextMenu && !showColorPicker && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          nodeId={contextMenu.nodeId}
          onAddChild={handleAddChildFromContext}
          onChangeColor={handleChangeColorFromContext}
          onDelete={
            contextMenu.nodeId !== 'root' ? () => {
              onDeleteNode(contextMenu.nodeId);
              handleCloseContextMenu();
            } : undefined
          }
          onClose={handleCloseContextMenu}
        />
      )}

      {showColorPicker && contextMenu && (
        <>
          {/* Keep context menu visible but show color picker */}
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            nodeId={contextMenu.nodeId}
            onAddChild={handleAddChildFromContext}
            onChangeColor={handleChangeColorFromContext}
            onDelete={
              contextMenu.nodeId !== 'root' ? () => {
                onDeleteNode(contextMenu.nodeId);
                handleCloseContextMenu();
              } : undefined
            }
            onClose={handleCloseContextMenu}
          />
          <div
            style={{
              position: 'fixed',
              left: `${contextMenu.x}px`,
              top: `${contextMenu.y + 120}px`,
              backgroundColor: 'white',
              border: '1px solid #ddd',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              zIndex: 10001,
              padding: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="color"
              value={tempColor}
              onChange={(e) => handleColorChange(e.target.value)}
              style={{
                width: '100%',
                height: '40px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            />
            <div style={{ display: 'flex', gap: '5px', justifyContent: 'flex-end' }}>
              <button
                onClick={handleColorCancel}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#f0f0f0',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
              >
                {t.cancel}
              </button>
              <button
                onClick={handleColorConfirm}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#4A90E2',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
              >
                {t.ok}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
});

MindMapCanvas.displayName = 'MindMapCanvas';

