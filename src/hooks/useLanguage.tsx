import React, { useState, createContext, useContext } from 'react';

export type Language = 'pt' | 'en';

interface Translations {
  addNode: string;
  addOrphanNode: string;
  exportPNG: string;
  exportPDF: string;
  zoomIn: string;
  zoomOut: string;
  resetZoom: string;
  addChild: string;
  deleteNode: string;
  changeColor: string;
  selectIcon: string;
  removeIcon: string;
  newNode: string;
  centralIdea: string;
  reset: string;
  newMap: string;
  ok: string;
  cancel: string;
  resize: string;
}

const translations: Record<Language, Translations> = {
  pt: {
    addNode: 'Adicionar Nó Filho',
    addOrphanNode: 'Adicionar Nó Órfão',
    exportPNG: 'Exportar PNG',
    exportPDF: 'Exportar PDF',
    zoomIn: 'Ampliar',
    zoomOut: 'Reduzir',
    resetZoom: 'Redefinir Zoom',
    addChild: 'Adicionar Filho',
    deleteNode: 'Excluir Nó',
    changeColor: 'Alterar Cor',
    selectIcon: 'Selecionar Ícone',
    removeIcon: 'Remover Ícone',
    newNode: 'Novo Nó',
    centralIdea: 'Ideia Central',
    reset: 'Redefinir',
    newMap: 'Novo Mapa',
    ok: 'OK',
    cancel: 'Cancelar',
    resize: 'Redimensionar',
  },
  en: {
    addNode: 'Add Child Node',
    addOrphanNode: 'Add Orphan Node',
    exportPNG: 'Export PNG',
    exportPDF: 'Export PDF',
    zoomIn: 'Zoom In',
    zoomOut: 'Zoom Out',
    resetZoom: 'Reset Zoom',
    addChild: 'Add Child',
    deleteNode: 'Delete Node',
    changeColor: 'Change Color',
    selectIcon: 'Select Icon',
    removeIcon: 'Remove Icon',
    newNode: 'New Node',
    centralIdea: 'Central Idea',
    reset: 'Reset',
    newMap: 'New Map',
    ok: 'OK',
    cancel: 'Cancel',
    resize: 'Resize',
  },
};

export const LanguageContext = createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}>({
  language: 'pt',
  setLanguage: () => {},
  t: translations.pt,
});

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

