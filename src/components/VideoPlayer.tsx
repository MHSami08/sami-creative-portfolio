import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, ExternalLink } from 'lucide-react';
import { useMemo, useState } from 'react';
import TikTokEmbed from './TikTokEmbed'; // Assuming you have this component

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
}

const VideoPlayer = ({ isOpen, onClose, videoUrl, title }: VideoPlayerProps) => {
  const [loading, setLoading] = useState(true);

  const getYouTubeVideoId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([^?&]+)/);
    return match ? match[1] : null;
  };

  const embedUrl = useMemo(() => {
    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
      const videoId = getYouTubeVideoId(videoUrl);
      return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : null;
    }
    return null;
  }, [videoUrl]);

  const isTikTok = videoUrl.includes('tiktok.com');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="w-full max-w-full sm:max-w-xl md:max-w-3xl lg:max-w-4xl p-4 sm:p-6 bg-black border-0 rounded-lg overflow-hidden" 
        style={{ maxHeight: '90vh' }}
      >
        <DialogHeader className="p-4 bg-background border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold truncate">{title}</DialogTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(videoUrl, '_blank')}
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" /> Open Original
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0"
                aria-label="Close video player"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div
          className={`${isTikTok ? 'aspect-[9/16]' : 'aspect-video'} bg-black w-full max-h-[80vh]`}
          style={{ maxHeight: '80vh', margin: '0 auto' }}
        >
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
              <div className="loader border-t-transparent border-4 border-primary rounded-full w-10 h-10 animate-spin"></div>
            </div>
          )}

          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={title}
              className="w-full h-full"
              frameBorder="0"
              onLoad={() => setLoading(false)}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : isTikTok ? (
            <TikTokEmbed videoUrl={videoUrl} />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Cannot preview this video.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoPlayer;
