import { useState, useEffect } from 'react';
import ContentManager, { SiteContent } from '@/utils/contentManager';
import { getLocalizedContent, subscribeLanguage } from '@/i18n/i18n';

export const useContent = () => {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const contentManager = ContentManager.getInstance();

  useEffect(() => {
    const update = () => setContent(getLocalizedContent(contentManager.getContent()));

    // Initial load
    update();
    setLoading(false);

    // Subscribe to content changes
    const unsubscribeContent = contentManager.subscribe(() => update());
    // Subscribe to language changes
    const unsubscribeLang = subscribeLanguage(() => update());

    return () => {
      unsubscribeContent();
      unsubscribeLang();
    };
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
    importContent,
  };
};
