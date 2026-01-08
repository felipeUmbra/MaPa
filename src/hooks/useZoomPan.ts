import { useState, useCallback } from 'react';

export const useZoomPan = () => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const zoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + 0.1, 2));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((prev) => Math.max(prev - 0.1, 0.5));
  }, []);

  const resetZoom = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const onMove = useCallback((x: number, y: number) => {
    setPan({ x, y });
  }, []);

  return {
    zoom,
    pan,
    zoomIn,
    zoomOut,
    resetZoom,
    onMove,
  };
};

