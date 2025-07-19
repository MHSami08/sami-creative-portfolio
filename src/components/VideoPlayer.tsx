import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, ExternalLink } from 'lucide-react';

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
}

const VideoPlayer = ({ isOpen, onClose, videoUrl, title }: VideoPlayerProps) => {
  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.includes('youtu.be') 
        ? url.split('youtu.be/')[1]?.split('?')[0]
        : url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }
    
    if (url.includes('tiktok.com')) {
      return null;
    }
    
    return url;
  };

  const embedUrl = getEmbedUrl(videoUrl);
  const isTikTok = videoUrl.includes('tiktok.com');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-0 bg-black border-0">
        <DialogHeader className="p-4 bg-background border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold truncate pr-4">
              {title}
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(videoUrl, '_blank')}
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Open Original
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="relative bg-black mx-auto w-[320px] h-[180px] md:w-full md:h-auto md:aspect-video">
          {embedUrl && !isTikTok ? (
            <iframe
              src={embedUrl}
              title={title}
              className="absolute top-0 left-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full bg-muted p-4 text-center">
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">Video Preview Not Available</h3>
                <p className="text-muted-foreground mb-6">
                  This platform doesn't support embedding. Click below to view on the original platform.
                </p>
                <Button
                  onClick={() => window.open(videoUrl, '_blank')}
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  View on {isTikTok ? 'TikTok' : 'Original Platform'}
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
