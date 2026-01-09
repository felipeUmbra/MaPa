import { MindMapNode } from '../types/mindmap';

export const calculateNodePosition = (
  parentNode: MindMapNode,
  childIndex: number,
  totalChildren: number,
  level: number
): { x: number; y: number } => {
  const verticalSpacing = 100;
  const levelOffset = level * 300;

  if (totalChildren === 1) {
    return {
      x: parentNode.x + levelOffset,
      y: parentNode.y,
    };
  }

  const startY = parentNode.y - ((totalChildren - 1) * verticalSpacing) / 2;
  return {
    x: parentNode.x + levelOffset,
    y: startY + childIndex * verticalSpacing,
  };
};

export const getDefaultNodeSize = (text: string): { width: number; height: number } => {
  const minWidth = 120;
  const minHeight = 60;
  const charWidth = 8;
  const charHeight = 20;
  const padding = 20;

  const estimatedWidth = Math.max(minWidth, text.length * charWidth + padding);
  const lines = Math.ceil(text.length / 20);
  const estimatedHeight = Math.max(minHeight, lines * charHeight + padding);

  return {
    width: estimatedWidth,
    height: estimatedHeight,
  };
};

