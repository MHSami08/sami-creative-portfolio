import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, ExternalLink } from 'lucide-react';

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
  isShortVideo?: boolean;
}

const VideoPlayer = ({ isOpen, onClose, videoUrl, title, isShortVideo = false }: VideoPlayerProps) => {
  const getEmbedUrl = (url: string) => {
    // YouTube
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.includes('youtu.be') 
        ? url.split('youtu.be/')[1]?.split('?')[0]
        : url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }

    // Vimeo
    if (url.includes('vimeo.com')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
      return `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=0`;
    }

    // Default fallback
    return null;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`w-full p-0 bg-black border-0 ${
        isShortVideo 
          ? 'max-w-sm sm:max-w-md h-[90vh] max-h-[800px]' 
          : 'max-w-4xl max-h-[90vh]'
      }`}>
        <DialogHeader className="p-3 sm:p-4 bg-background border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-sm sm:text-lg font-semibold truncate pr-2 sm:pr-4">
              {title}
            </DialogTitle>
            <div className="flex items-center gap-1 sm:gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(videoUrl, '_blank')}
                className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3"
              >
                <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Open Original</span>
                <span className="sm:hidden">Open</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-6 w-6 sm:h-8 sm:w-8 p-0"
              >
                <X className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className={`bg-black ${
          isShortVideo 
            ? 'aspect-[9/16] max-h-[calc(90vh-80px)]' 
            : 'aspect-video max-h-[calc(90vh-80px)]'
        }`}>
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-muted">
              <div className="text-center p-4 sm:p-8">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Video Preview Not Available</h3>
                <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
                  This platform doesn't support embedding. Click below to view on the original platform.
                </p>
                <Button
                  onClick={() => window.open(videoUrl, '_blank')}
                  className="flex items-center gap-2 text-sm sm:text-base"
                >
                  <ExternalLink className="h-4 w-4" />
                  View on Original Platform
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoPlayer;
