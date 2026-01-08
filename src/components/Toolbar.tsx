import React from 'react';
import { useExport } from '../hooks/useExport';
import { useLanguage } from '../hooks/useLanguage';

interface ToolbarProps {
  onAddNode: () => void;
  onAddOrphanNode: () => void;
  onNewMap: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  onAddNode,
  onAddOrphanNode,
  onNewMap,
}) => {
  const { exportPNG, exportPDF } = useExport('mindmap-canvas');
  const { language, setLanguage, t } = useLanguage();

  return (
    <div
      style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        zIndex: 1000,
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <button
        onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
        style={{
          padding: '8px 12px',
          backgroundColor: '#9B59B6',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: '500',
        }}
        title={language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
      >
        {language === 'pt' ? 'EN' : 'PT'}
      </button>

      <button
        onClick={onNewMap}
        style={{
          padding: '8px 16px',
          backgroundColor: '#E67E22',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
        }}
        title={t.newMap}
      >
        🗺️ {t.newMap}
      </button>

      <button
        onClick={onAddNode}
        style={{
          padding: '8px 16px',
          backgroundColor: '#4A90E2',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
        }}
        title={t.addNode}
      >
        + {t.addNode}
      </button>

      <button
        onClick={onAddOrphanNode}
        style={{
          padding: '8px 16px',
          backgroundColor: '#F39C12',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
        }}
        title={t.addOrphanNode}
      >
        + {t.addOrphanNode}
      </button>

      <div style={{ width: '1px', height: '30px', backgroundColor: '#ddd' }} />

      <button
        onClick={exportPNG}
        style={{
          padding: '8px 16px',
          backgroundColor: '#27AE60',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
        }}
        title={t.exportPNG}
      >
        📥 {t.exportPNG}
      </button>

      <button
        onClick={exportPDF}
        style={{
          padding: '8px 16px',
          backgroundColor: '#E74C3C',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
        }}
        title={t.exportPDF}
      >
        📄 {t.exportPDF}
      </button>
    </div>
  );
};

