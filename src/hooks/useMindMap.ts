import { useState, useCallback, useEffect } from 'react';
import { NodeChange } from 'reactflow';
import { MindMapNode, MindMapConnection } from '../types/mindmap';
import { calculateNodePosition, getDefaultNodeSize } from '../utils/layoutUtils';
import { useLanguage } from './useLanguage';

const generateId = () => `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const STORAGE_KEY = 'mindmap-data';

const getInitialNodes = (t: { centralIdea: string }): MindMapNode[] => [
  {
    id: 'root',
    text: t.centralIdea,
    x: 400,
    y: 300,
    color: '#4A90E2',
    width: 150,
    height: 80,
  },
];

const loadFromStorage = (): { nodes: MindMapNode[]; connections: MindMapConnection[] } | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading from localStorage:', error);
  }
  return null;
};

const saveToStorage = (nodes: MindMapNode[], connections: MindMapConnection[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ nodes, connections }));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const useMindMap = () => {
  const { t } = useLanguage();
  
  // Load from storage or use initial state
  const storedData = loadFromStorage();
  const initialNodes = storedData?.nodes || getInitialNodes(t);

  const initialConnections = storedData?.connections || [];

  const [nodes, setNodes] = useState<MindMapNode[]>(initialNodes);
  const [connections, setConnections] = useState<MindMapConnection[]>(initialConnections);

  // Save to storage whenever nodes or connections change
  useEffect(() => {
    saveToStorage(nodes, connections);
  }, [nodes, connections]);



  const addNode = useCallback((parentId?: string) => {
    const parentNode = parentId ? nodes.find((n) => n.id === parentId) : nodes[0];
    if (!parentNode) return;

    const siblings = nodes.filter((n) => n.parentId === parentId || (!parentId && !n.parentId && n.id !== 'root'));
    const newId = generateId();
    const position = calculateNodePosition(parentNode, siblings.length, siblings.length + 1, parentId ? 1 : 1);
    const size = getDefaultNodeSize('New Node');

    const newNode: MindMapNode = {
      id: newId,
      text: t.newNode,
      x: position.x,
      y: position.y,
      color: parentNode.color, // Inherit color from parent
      parentId: parentId || 'root',
      ...size,
    };

    setNodes((prev) => [...prev, newNode]);

    // Always create a connection when adding a child node
    const sourceId = parentId || 'root';
    const connectionId = `conn-${sourceId}-${newId}`;
    
    // Check if connection already exists
    setConnections((prev) => {
      const exists = prev.some(
        (conn) => conn.source === sourceId && conn.target === newId
      );
      if (exists) return prev;
      
      return [
        ...prev,
        {
          id: connectionId,
          source: sourceId,
          target: newId,
        },
      ];
    });
  }, [nodes, t.newNode]);

  const addOrphanNode = useCallback(() => {
    // Find a good position for orphan node (center-right of canvas)
    const rootNode = nodes.find((n) => n.id === 'root');
    if (!rootNode) return;

    const newId = generateId();
    const size = getDefaultNodeSize(t.newNode);

    const newNode: MindMapNode = {
      id: newId,
      text: t.newNode,
      x: rootNode.x + 400, // Position to the right of root
      y: rootNode.y,
      color: '#4A90E2',
      // No parentId - this is an orphan node
      ...size,
    };

    setNodes((prev) => [...prev, newNode]);
    // No connection is created for orphan nodes
  }, [nodes, t.newNode]);

  const updateNode = useCallback((nodeId: string, updates: Partial<MindMapNode>) => {
    setNodes((prev) =>
      prev.map((node) => {
        if (node.id === nodeId) {
          const updated = { ...node, ...updates };
          if (updates.text) {
            const size = getDefaultNodeSize(updates.text);
            updated.width = size.width;
            updated.height = size.height;
          }
          return updated;
        }
        return node;
      })
    );
  }, []);

  const deleteNode = useCallback((nodeId: string) => {
    if (nodeId === 'root') return; // Prevent deleting root node

    setNodes((prev) => {
      const nodeToDelete = prev.find((n) => n.id === nodeId);
      if (!nodeToDelete) return prev;

      // Delete all children recursively
      const deleteChildren = (id: string): string[] => {
        const children = prev.filter((n) => n.parentId === id);
        const childIds = children.map((c) => c.id);
        return [...childIds, ...children.flatMap((c) => deleteChildren(c.id))];
      };

      const idsToDelete = [nodeId, ...deleteChildren(nodeId)];
      return prev.filter((n) => !idsToDelete.includes(n.id));
    });

    setConnections((prev) =>
      prev.filter((conn) => conn.source !== nodeId && conn.target !== nodeId)
    );
  }, []);

  const addConnection = useCallback((source: string, target: string) => {
    // Allow multiple connections to the same node
    const connectionId = `conn-${source}-${target}-${Date.now()}`;
    
    setConnections((prev) => {
      // Check if exact same connection already exists
      const exists = prev.some(
        (conn) => conn.source === source && conn.target === target
      );
      if (exists) return prev;
      
      return [
        ...prev,
        {
          id: connectionId,
          source,
          target,
        },
      ];
    });
  }, []);

  const resetMap = useCallback(() => {
    const initialNodes = getInitialNodes(t);
    setNodes(initialNodes);
    setConnections([]);
    // Clear storage
    localStorage.removeItem(STORAGE_KEY);
  }, [t]);

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((prev) => {
      const updated = [...prev];
      changes.forEach((change) => {
        if (change.type === 'position' && change.position) {
          const index = updated.findIndex((n) => n.id === change.id);
          if (index !== -1) {
            updated[index] = {
              ...updated[index],
              x: change.position.x,
              y: change.position.y,
            };
          }
        } else if (change.type === 'remove') {
          const index = updated.findIndex((n) => n.id === change.id);
          if (index !== -1 && updated[index].id !== 'root') {
            updated.splice(index, 1);
          }
        }
      });
      return updated;
    });
  }, []);

  return {
    nodes,
    connections,
    addNode,
    addOrphanNode,
    addConnection,
    updateNode,
    deleteNode,
    resetMap,
    onNodesChange,
  };
};

