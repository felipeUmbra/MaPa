import React, { useState, useRef, useEffect } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { MindMapNode } from '../types/mindmap';
import { useLanguage } from '../hooks/useLanguage';

interface CustomNodeProps extends NodeProps {
  data: {
    node: MindMapNode;
    onUpdate: (id: string, updates: Partial<MindMapNode>) => void;
    onDelete: (id: string) => void;
    onAddChild: (parentId: string) => void;
  };
}

const ICONS = ['💡', '⭐', '🎯', '📝', '🔗', '💼', '🎨', '🚀', '📊', '💻', '🎓', '❤️', '✨', '🔥', '🌟'];

export const CustomNode: React.FC<CustomNodeProps> = ({ data, selected }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(data.node.text);
  const [showIconPicker, setShowIconPicker] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (text.trim() && text !== data.node.text) {
      data.onUpdate(data.node.id, { text: text.trim() });
    } else {
      setText(data.node.text);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBlur();
    } else if (e.key === 'Escape') {
      setText(data.node.text);
      setIsEditing(false);
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    data.onUpdate(data.node.id, { color: e.target.value });
  };

  const handleIconSelect = (icon: string) => {
    data.onUpdate(data.node.id, { icon });
    setShowIconPicker(false);
  };

  const handleRemoveIcon = () => {
    data.onUpdate(data.node.id, { icon: undefined });
    setShowIconPicker(false);
  };

  return (
    <div
      className="mindmap-node"
      style={{
        backgroundColor: data.node.color,
        border: selected ? '3px solid #333' : '2px solid #666',
        borderRadius: '8px',
        padding: '10px',
        minWidth: data.node.width || 120,
        minHeight: data.node.height || 60,
        position: 'relative',
        boxShadow: selected ? '0 4px 12px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.2)',
      }}
    >
      <Handle type="target" position={Position.Left} style={{ background: '#555' }} />
      
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            width: '100%',
            fontSize: '14px',
            fontWeight: '500',
            color: '#fff',
            textAlign: 'center',
          }}
        />
      ) : (
        <div
          onDoubleClick={handleDoubleClick}
          style={{
            fontSize: '14px',
            fontWeight: '500',
            color: '#fff',
            textAlign: 'center',
            cursor: 'text',
            wordWrap: 'break-word',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          {data.node.icon && <span style={{ fontSize: '18px' }}>{data.node.icon}</span>}
          <span>{data.node.text}</span>
        </div>
      )}

      {selected && (
        <div
          style={{
            position: 'absolute',
            top: '-30px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '5px',
            backgroundColor: '#333',
            padding: '5px',
            borderRadius: '4px',
          }}
        >
          <input
            type="color"
            value={data.node.color}
            onChange={handleColorChange}
            style={{ width: '24px', height: '24px', cursor: 'pointer', border: 'none' }}
            title={t.changeColor}
          />
          <button
            onClick={() => setShowIconPicker(!showIconPicker)}
            style={{
              padding: '4px 8px',
              fontSize: '12px',
              backgroundColor: '#9B59B6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
            title={t.selectIcon}
          >
            {data.node.icon || '🎨'}
          </button>
          <button
            onClick={() => data.onAddChild(data.node.id)}
            style={{
              padding: '4px 8px',
              fontSize: '12px',
              backgroundColor: '#4A90E2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
            title={t.addChild}
          >
            +
          </button>
          {data.node.id !== 'root' && (
            <button
              onClick={() => data.onDelete(data.node.id)}
              style={{
                padding: '4px 8px',
                fontSize: '12px',
                backgroundColor: '#E74C3C',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
              title={t.deleteNode}
            >
              ×
            </button>
          )}
          {showIconPicker && (
            <div
              style={{
                position: 'absolute',
                top: '40px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#333',
                padding: '10px',
                borderRadius: '8px',
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '5px',
                zIndex: 1000,
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                maxWidth: '200px',
              }}
            >
              {ICONS.map((icon) => (
                <button
                  key={icon}
                  onClick={() => handleIconSelect(icon)}
                  style={{
                    fontSize: '20px',
                    padding: '5px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    backgroundColor: data.node.icon === icon ? '#4A90E2' : 'transparent',
                  }}
                  title={t.selectIcon}
                >
                  {icon}
                </button>
              ))}
              <button
                onClick={handleRemoveIcon}
                style={{
                  gridColumn: '1 / -1',
                  padding: '5px',
                  fontSize: '12px',
                  backgroundColor: '#E74C3C',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginTop: '5px',
                }}
                title={t.removeIcon}
              >
                {t.removeIcon}
              </button>
            </div>
          )}
        </div>
      )}

      <Handle type="source" position={Position.Right} style={{ background: '#555' }} />
    </div>
  );
};

