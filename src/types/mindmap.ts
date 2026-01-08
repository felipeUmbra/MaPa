export interface MindMapNode {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
  icon?: string;
  parentId?: string;
  width?: number;
  height?: number;
}

export interface MindMapConnection {
  id: string;
  source: string;
  target: string;
}

export interface MindMapData {
  nodes: MindMapNode[];
  connections: MindMapConnection[];
}

