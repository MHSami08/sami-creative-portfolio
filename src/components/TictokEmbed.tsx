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
    blockquote.setAttribute('data-video-id', extractVideoId(videoUrl));
    blockquote.style.maxWidth = '100%';
    blockquote.style.minWidth = '325px';

    embedRef.current.appendChild(blockquote);
    loadTikTokScript();
  }, [videoUrl]);

  const extractVideoId = (url: string) => {
    const match = url.match(/\/video\/(\d+)/);
    return match ? match[1] : '';
  };

  const loadTikTokScript = () => {
    if (document.getElementById('tiktok-embed-script')) return;

    const script = document.createElement('script');
    script.id = 'tiktok-embed-script';
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    document.body.appendChild(script);
  };

  return <div ref={embedRef} className="w-full flex justify-center"></div>;
};

export default TikTokEmbed;
