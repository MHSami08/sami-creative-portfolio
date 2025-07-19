import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, ExternalLink } from 'lucide-react';
import ReactPlayer from 'react-player';

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
}

const VideoPlayer = ({ isOpen, onClose, videoUrl, title }: VideoPlayerProps) => {
  const isPlayable = ReactPlayer.canPlay(videoUrl);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-full p-0 bg-transparent border-0">
        <DialogHeader className="p-4 bg-background">
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

        <div className="relative w-full aspect-video mx-auto">
          {isPlayable ? (
            <ReactPlayer
              url={videoUrl}
              width="100%"
              height="100%"
              controls
              playing
              style={{ position: 'absolute', top: 0, left: 0 }}
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
