import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';

interface ContextMenuProps {
  x: number;
  y: number;
  nodeId: string;
  onAddChild: () => void;
  onChangeColor: () => void;
  onDelete?: () => void;
  onClose: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  x,
  y,
  nodeId,
  onAddChild,
  onChangeColor,
  onDelete,
  onClose,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      style={{
        position: 'fixed',
        left: `${x}px`,
        top: `${y}px`,
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        zIndex: 10000,
        minWidth: '180px',
        padding: '4px',
      }}
    >
      <button
        onClick={() => {
          onAddChild();
          onClose();
        }}
        style={{
          width: '100%',
          padding: '8px 12px',
          textAlign: 'left',
          border: 'none',
          backgroundColor: 'transparent',
          cursor: 'pointer',
          fontSize: '14px',
          borderRadius: '4px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#f0f0f0';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        ➕ {t.addChild}
      </button>
      <button
        onClick={() => {
          onChangeColor();
          // Don't close immediately - let the color picker show
        }}
        style={{
          width: '100%',
          padding: '8px 12px',
          textAlign: 'left',
          border: 'none',
          backgroundColor: 'transparent',
          cursor: 'pointer',
          fontSize: '14px',
          borderRadius: '4px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#f0f0f0';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        🎨 {t.changeColor}
      </button>
      {onDelete && nodeId !== 'root' && (
        <button
          onClick={() => {
            onDelete();
            onClose();
          }}
          style={{
            width: '100%',
            padding: '8px 12px',
            textAlign: 'left',
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            fontSize: '14px',
            borderRadius: '4px',
            color: '#E74C3C',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#ffe0e0';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          🗑️ {t.deleteNode}
        </button>
      )}
    </div>
  );
};

