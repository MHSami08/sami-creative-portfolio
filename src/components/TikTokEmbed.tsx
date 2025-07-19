import { useEffect, useRef } from 'react';

interface TikTokEmbedProps {
  videoUrl: string;
}

const TikTokEmbed = ({ videoUrl }: TikTokEmbedProps) => {
  const embedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!videoUrl || !embedRef.current) return;

    embedRef.current.innerHTML = '';

    const blockquote = document.createElement('blockquote');
    blockquote.className = 'tiktok-embed';
    blockquote.setAttribute('cite', videoUrl);
    blockquote.setAttribute('style', 'max-width: 100%; min-width: 325px;');

    embedRef.current.appendChild(blockquote);

    loadTikTokScript();
  }, [videoUrl]);

  const loadTikTokScript = () => {
    // Remove existing script to reload
    const existingScript = document.getElementById('tiktok-embed-script');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.id = 'tiktok-embed-script';
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    document.body.appendChild(script);
  };

  return <div ref={embedRef} className="w-full flex justify-center"></div>;
};

export default TikTokEmbed;
