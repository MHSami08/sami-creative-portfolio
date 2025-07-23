import { useState, useEffect } from 'react';
import ContentManager, { SiteContent } from '@/utils/contentManager';

export const useContent = () => {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const contentManager = ContentManager.getInstance();

  useEffect(() => {
    // Initial load
    setContent(contentManager.getContent());
    setLoading(false);

    // Subscribe to changes
    const unsubscribe = contentManager.subscribe((updatedContent) => {
      setContent(updatedContent);
    });

    return unsubscribe;
  }, [contentManager]);

  const updateSection = (section: keyof SiteContent, data: any) => {
    contentManager.updateContent(section, data);
  };

  const resetToDefaults = () => {
    contentManager.resetToDefaults();
  };

  const exportContent = () => {
    return contentManager.exportContent();
  };

  const importContent = (contentJson: string) => {
    contentManager.importContent(contentJson);
  };

  return {
    content,
    loading,
    updateSection,
    resetToDefaults,
    exportContent,
    importContent
  };
};