import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getLanguage, setLanguage, type Language, subscribeLanguage } from '@/i18n/i18n';
import { useEffect, useState } from 'react';

const LanguageToggle = () => {
  const [lang, setLang] = useState<Language>(getLanguage());

  useEffect(() => {
    const unsub = subscribeLanguage((l) => setLang(l));
    return unsub;
  }, []);

  const toggle = () => {
    const next: Language = lang === 'en' ? 'bn' : 'en';
    setLanguage(next);
  };

  return (
    <Button
      variant="outline"
      onClick={toggle}
      className="px-2 sm:px-3 py-1 rounded-lg border-primary/30"
      aria-label={lang === 'en' ? 'Switch to Bangla' : 'Switch to English'}
      title={lang === 'en' ? 'Switch to Bangla' : 'Switch to English'}
    >
      <Globe className="h-4 w-4 mr-1" />
      <span className="text-xs sm:text-sm font-medium">{lang === 'en' ? 'BN' : 'EN'}</span>
    </Button>
  );
};

export default LanguageToggle;
