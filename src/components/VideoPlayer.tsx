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

  const getYouTubeEmbedUrl = (url: string) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/
    );
    return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : null;
  };

  const getVimeoEmbedUrl = (url: string) => {
    const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    return match ? `https://player.vimeo.com/video/${match[1]}?autoplay=1` : null;
  };

  const embedUrl = getYouTubeEmbedUrl(videoUrl) || getVimeoEmbedUrl(videoUrl);
  
  // Adjust dimensions for better desktop viewing
  const getPlayerDimensions = () => {
    if (isShortVideo) {
      // For 9:16 videos, make them much smaller on desktop to fit properly
      return {
        containerClass: "w-full max-w-xs sm:max-w-sm lg:max-w-md max-h-[75vh]",
        aspectClass: "aspect-[9/16]"
      };
    } else {
      // For regular videos
      return {
        containerClass: "w-full max-w-3xl max-h-[75vh]",
        aspectClass: "aspect-video"
      };
    }
  };

  const { containerClass, aspectClass } = getPlayerDimensions();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6 lg:p-8 transition-opacity duration-300">
      <div
        className={`
          relative bg-background rounded-lg shadow-xl
          ${containerClass} flex flex-col overflow-hidden
        `}
        style={{ maxHeight: '80vh', maxWidth: '90vw' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
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

        {/* Video Container */}
        <div className={`flex-grow ${aspectClass} bg-black`}>
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={title}
              className="w-full h-full rounded-b-lg border-0"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full bg-muted rounded-b-lg flex items-center justify-center">
              <p className="text-muted-foreground">Unable to load video</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
