import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
  isShortVideo?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  isOpen,
  onClose,
  videoUrl,
  title,
  isShortVideo = false,
}) => {
  if (!isOpen) return null;

  // Parse YouTube URLs
  const getYouTubeEmbedUrl = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : null;
  };

  // Parse Vimeo URLs
  const getVimeoEmbedUrl = (url: string) => {
    const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    return match ? `https://player.vimeo.com/video/${match[1]}?autoplay=1` : null;
  };

  const embedUrl = getYouTubeEmbedUrl(videoUrl) || getVimeoEmbedUrl(videoUrl);
  const aspectRatio = isShortVideo ? 'aspect-[9/16]' : 'aspect-video';
  
  // Responsive width classes
  const maxWidth = isShortVideo
    ? 'max-w-sm md:max-w-md lg:max-w-lg'
    : 'max-w-lg md:max-w-2xl lg:max-w-4xl';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 transition-opacity duration-300">
      <div className={`relative bg-background rounded-lg shadow-xl ${maxWidth} w-full`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground truncate pr-4">{title}</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="flex-shrink-0 hover:bg-muted"
            aria-label="Close video player"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Video Content */}
        <div className="p-4">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={title}
              className={`w-full ${aspectRatio} rounded-lg border-0`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className={`w-full ${aspectRatio} bg-muted rounded-lg flex items-center justify-center`}>
              <p className="text-muted-foreground">Unable to load video</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
