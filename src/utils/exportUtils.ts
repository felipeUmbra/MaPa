import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportAsPNG = async (elementId: string, filename: string = 'mindmap.png'): Promise<void> => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Element not found for export');
  }

  // Find the ReactFlow container - this contains all the rendered content
  const reactFlowContainer = element.querySelector('.react-flow') as HTMLElement;
  if (!reactFlowContainer) {
    throw new Error('ReactFlow container not found');
  }

  // Hide UI elements temporarily
  const toolbar = document.querySelector('[style*="position: absolute"][style*="top: 10px"]') as HTMLElement;
  const controls = element.querySelector('.react-flow__controls') as HTMLElement;
  const minimap = element.querySelector('.react-flow__minimap') as HTMLElement;
  
  const originalToolbarDisplay = toolbar?.style.display || '';
  const originalControlsDisplay = controls?.style.display || '';
  const originalMinimapDisplay = minimap?.style.display || '';

  if (toolbar) toolbar.style.display = 'none';
  if (controls) controls.style.display = 'none';
  if (minimap) minimap.style.display = 'none';

  // Wait a bit for the DOM to update
  await new Promise(resolve => setTimeout(resolve, 200));

  try {
    // Capture the ReactFlow container with settings optimized for SVG rendering
    const canvas = await html2canvas(reactFlowContainer, {
      backgroundColor: '#ffffff',
      scale: 2,
      logging: false,
      useCORS: true,
      allowTaint: false,
      foreignObjectRendering: true,
      removeContainer: false,
      onclone: (clonedDoc) => {
        // Ensure UI elements are hidden in the cloned document
        const clonedToolbar = clonedDoc.querySelector('[style*="position: absolute"][style*="top: 10px"]') as HTMLElement;
        const clonedControls = clonedDoc.querySelector('.react-flow__controls') as HTMLElement;
        const clonedMinimap = clonedDoc.querySelector('.react-flow__minimap') as HTMLElement;
        
        if (clonedToolbar) clonedToolbar.style.display = 'none';
        if (clonedControls) clonedControls.style.display = 'none';
        if (clonedMinimap) clonedMinimap.style.display = 'none';
      },
    });

    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } finally {
    // Restore UI elements
    if (toolbar) toolbar.style.display = originalToolbarDisplay;
    if (controls) controls.style.display = originalControlsDisplay;
    if (minimap) minimap.style.display = originalMinimapDisplay;
  }
};

export const exportAsPDF = async (elementId: string, filename: string = 'mindmap.pdf'): Promise<void> => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Element not found for export');
  }

  // Find the ReactFlow container - this contains all the rendered content
  const reactFlowContainer = element.querySelector('.react-flow') as HTMLElement;
  if (!reactFlowContainer) {
    throw new Error('ReactFlow container not found');
  }

  // Hide UI elements temporarily
  const toolbar = document.querySelector('[style*="position: absolute"][style*="top: 10px"]') as HTMLElement;
  const controls = element.querySelector('.react-flow__controls') as HTMLElement;
  const minimap = element.querySelector('.react-flow__minimap') as HTMLElement;
  
  const originalToolbarDisplay = toolbar?.style.display || '';
  const originalControlsDisplay = controls?.style.display || '';
  const originalMinimapDisplay = minimap?.style.display || '';

  if (toolbar) toolbar.style.display = 'none';
  if (controls) controls.style.display = 'none';
  if (minimap) minimap.style.display = 'none';

  // Wait a bit for the DOM to update
  await new Promise(resolve => setTimeout(resolve, 200));

  try {
    // Capture the ReactFlow container with settings optimized for SVG rendering
    const canvas = await html2canvas(reactFlowContainer, {
      backgroundColor: '#ffffff',
      scale: 2,
      logging: false,
      useCORS: true,
      allowTaint: false,
      foreignObjectRendering: true,
      removeContainer: false,
      onclone: (clonedDoc) => {
        // Ensure UI elements are hidden in the cloned document
        const clonedToolbar = clonedDoc.querySelector('[style*="position: absolute"][style*="top: 10px"]') as HTMLElement;
        const clonedControls = clonedDoc.querySelector('.react-flow__controls') as HTMLElement;
        const clonedMinimap = clonedDoc.querySelector('.react-flow__minimap') as HTMLElement;
        
        if (clonedToolbar) clonedToolbar.style.display = 'none';
        if (clonedControls) clonedControls.style.display = 'none';
        if (clonedMinimap) clonedMinimap.style.display = 'none';
      },
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(filename);
  } finally {
    // Restore UI elements
    if (toolbar) toolbar.style.display = originalToolbarDisplay;
    if (controls) controls.style.display = originalControlsDisplay;
    if (minimap) minimap.style.display = originalMinimapDisplay;
  }
};

