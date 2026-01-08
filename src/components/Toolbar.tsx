import React, { useState, useRef, useEffect } from 'react';
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
  const [showAddNode, setShowAddNode] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const addNodeRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (addNodeRef.current && !addNodeRef.current.contains(event.target as Node)) {
      setShowAddNode(false);
    }
    if (exportRef.current && !exportRef.current.contains(event.target as Node)) {
      setShowExport(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className="mindmap-toolbar"
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

      {/* Add Node Dropdown */}
      <div style={{ position: 'relative' }} ref={addNodeRef}>
        <button
          onClick={() => setShowAddNode(!showAddNode)}
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
        >
          + {t.addNode}
        </button>
        {showAddNode && (
          <div style={{
            position: 'absolute',
            top: '40px',
            left: '0',
            backgroundColor: 'white',
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            zIndex: 1001,
          }}>
            <button
              onClick={() => { onAddNode(); setShowAddNode(false); }}
              style={{ display: 'block', width: '100%', padding: '10px 20px', border: 'none', backgroundColor: 'transparent', textAlign: 'left', cursor: 'pointer' }}
            >
              {t.addChildNode}
            </button>
            <button
              onClick={() => { onAddOrphanNode(); setShowAddNode(false); }}
              style={{ display: 'block', width: '100%', padding: '10px 20px', border: 'none', backgroundColor: 'transparent', textAlign: 'left', cursor: 'pointer' }}
            >
              {t.addOrphanNode}
            </button>
          </div>
        )}
      </div>

      <div style={{ width: '1px', height: '30px', backgroundColor: '#ddd' }} />

      {/* Export Dropdown */}
      <div style={{ position: 'relative' }} ref={exportRef}>
        <button
          onClick={() => setShowExport(!showExport)}
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
        >
          📥 {t.export}
        </button>
        {showExport && (
          <div style={{
            position: 'absolute',
            top: '40px',
            left: '0',
            backgroundColor: 'white',
            borderRadius: '4px',
            boxShadow: '0 2px 8px (0,0,0,0.15)',
            zIndex: 1001,
          }}>
            <button
              onClick={() => { exportPNG(); setShowExport(false); }}
              style={{ display: 'block', width: '100%', padding: '10px 20px', border: 'none', backgroundColor: 'transparent', textAlign: 'left', cursor: 'pointer' }}
            >
              {t.exportPNG}
            </button>
            <button
              onClick={() => { exportPDF(); setShowExport(false); }}
              style={{ display: 'block', width: '100%', padding: '10px 20px', border: 'none', backgroundColor: 'transparent', textAlign: 'left', cursor: 'pointer' }}
            >
              {t.exportPDF}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


