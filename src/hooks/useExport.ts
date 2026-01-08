import { useCallback } from 'react';
import { exportAsPNG, exportAsPDF } from '../utils/exportUtils';

export const useExport = (elementId: string = 'mindmap-canvas') => {
  const handleExportPNG = useCallback(async () => {
    try {
      await exportAsPNG(elementId, 'mindmap.png');
    } catch (error) {
      console.error('Failed to export PNG:', error);
      alert('Failed to export as PNG. Please try again.');
    }
  }, [elementId]);

  const handleExportPDF = useCallback(async () => {
    try {
      await exportAsPDF(elementId, 'mindmap.pdf');
    } catch (error) {
      console.error('Failed to export PDF:', error);
      alert('Failed to export as PDF. Please try again.');
    }
  }, [elementId]);

  return {
    exportPNG: handleExportPNG,
    exportPDF: handleExportPDF,
  };
};

