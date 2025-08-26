import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Calendar, Clock, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { VideoProject } from '@/utils/projectManager';
import { useMouseTracking } from '@/hooks/useMouseTracking';

interface VideoScrollSectionProps {
  title: string;
  subtitle: string;
  videos: VideoProject[];
  onVideoClick: (project: VideoProject) => void;
  isShortVideo?: boolean;
}

const VideoScrollSection = ({ 
  title, 
  subtitle, 
  videos, 
  onVideoClick, 
  isShortVideo = false 
}: VideoScrollSectionProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const { getParallaxTransform } = useMouseTracking({ 
    ref: sectionRef, 
    intensity: 10 
  });

  // Helper functions for thumbnails
  const getYouTubeThumbnail = (url: string) => {
    const videoId = url.includes('youtu.be')
      ? url.split('youtu.be/')[1]?.split('?')[0]
      : url.split('v=')[1]?.split('&')[0];
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';
  };

  const getVimeoThumbnail = (url: string) => {
    const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1];
    return videoId ? `https://vumbnail.com/${videoId}.jpg` : '';
  };

  const getAutoThumbnail = (url: string) => {
    if (url?.includes('youtu')) {
      return getYouTubeThumbnail(url);
    } else if (url?.includes('vimeo')) {
      return getVimeoThumbnail(url);
    }
    return null;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planned': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'learning': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const checkScrollButtons = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const scrollAmount = isShortVideo ? 300 : 400;
    const newScrollLeft = direction === 'left' 
      ? scrollContainerRef.current.scrollLeft - scrollAmount
      : scrollContainerRef.current.scrollLeft + scrollAmount;
    
    scrollContainerRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    checkScrollButtons();
    container.addEventListener('scroll', checkScrollButtons);
    
    return () => container.removeEventListener('scroll', checkScrollButtons);
  }, [videos]);

  if (videos.length === 0) {
    return (
      <div className="mb-16" ref={sectionRef}>
        <h3 className="text-3xl sm:text-4xl font-bold mb-2 text-center gradient-text-3d">
          {title}
        </h3>
        <p className="text-muted-foreground text-center mb-8 text-lg">{subtitle}</p>
        
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-muted/50 mb-6 animate-pulse-scale-3d">
            <Play className="w-10 h-10 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-lg">No {title.toLowerCase()} available yet.</p>
          <p className="text-sm text-muted-foreground mt-2">Check back soon for amazing content!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-20" ref={sectionRef}>
      {/* Section Header */}
      <div className="text-center mb-12">
        <h3 className="text-3xl sm:text-4xl font-bold mb-2 gradient-text-3d">
          {title}
        </h3>
        <p className="text-muted-foreground text-lg" style={{ transform: getParallaxTransform(0.5) }}>
          {subtitle}
        </p>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="relative">
        {/* Navigation Buttons */}
        {canScrollLeft && (
          <Button
            onClick={() => scroll('left')}
            className="scroll-nav-button left-4"
            size="icon"
            variant="ghost"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
        )}
        
        {canScrollRight && (
          <Button
            onClick={() => scroll('right')}
            className="scroll-nav-button right-4"
            size="icon"
            variant="ghost"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        )}

        {/* Video Cards Container */}
        <div 
          ref={scrollContainerRef}
          className="video-scroll-container px-4"
        >
          {videos.map((project, index) => (
            <VideoCard
              key={project.id}
              project={project}
              index={index}
              isShortVideo={isShortVideo}
              onVideoClick={onVideoClick}
              getAutoThumbnail={getAutoThumbnail}
              getStatusColor={getStatusColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface VideoCardProps {
  project: VideoProject;
  index: number;
  isShortVideo: boolean;
  onVideoClick: (project: VideoProject) => void;
  getAutoThumbnail: (url: string) => string | null;
  getStatusColor: (status: string) => string;
}

const VideoCard = ({ 
  project, 
  index, 
  isShortVideo, 
  onVideoClick, 
  getAutoThumbnail, 
  getStatusColor 
}: VideoCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { getTransform, isHovering } = useMouseTracking({ 
    ref: cardRef, 
    intensity: 8, 
    perspective: 1200 
  });

  const handleClick = () => {
    if (project.status === 'completed' && project.videoUrl && project.videoUrl !== 'N/A') {
      onVideoClick(project);
    }
  };

  return (
    <article  
      ref={cardRef}
      className={`video-card-3d group ${
        project.status === 'completed' && project.videoUrl && project.videoUrl !== 'N/A' 
          ? 'cursor-pointer' 
          : 'cursor-default'
      }`}
      style={{ 
        animationDelay: `${index * 0.1}s`,
        transform: getTransform()
      }}
      onClick={handleClick}
    >
      {/* Video Thumbnail */}
      <div className="relative overflow-hidden">
        <img 
          src={getAutoThumbnail(project.videoUrl) || project.thumbnail}
          alt={`${project.title} thumbnail`}
          className={`w-full object-cover transition-all duration-700 ${
            isShortVideo ? 'aspect-[9/16]' : 'aspect-video'
          } ${isHovering ? 'scale-110 brightness-110' : 'scale-100'}`}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Status Badge */}
        {project.status === 'completed' && (
          <div className="absolute top-4 right-4">
            <span className="bg-green-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              Ready to Watch
            </span>
          </div>
        )}

        {/* Play Button Overlay */}
        {project.status === 'completed' && project.videoUrl && project.videoUrl !== 'N/A' && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 animate-pulse-scale-3d">
              <Play className="w-8 h-8 text-white ml-1" />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <HoverCard>
              <HoverCardTrigger asChild>
                <h4 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-300 cursor-pointer truncate pr-2">  
                  {project.title}  
                </h4>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 p-6 bg-card border border-border shadow-xl" side="top">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="h-4 w-4 text-primary" />
                    <h5 className="font-semibold">{project.title}</h5>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.detailedDescription}
                  </p>
                  <div className="space-y-2">
                    <h6 className="font-medium text-sm">Key Features:</h6>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {project.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2 border-t">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{project.type}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{project.duration}</span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
            
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>  
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}  
            </span>  
          </div>  
          
          <div className="ml-4 flex-shrink-0">  
            <Play className="h-8 w-8 text-blue-500 group-hover:scale-110 transition-transform duration-300" />  
          </div>
        </div>

        {/* Project Details */}
        <p className="text-muted-foreground mb-4 leading-relaxed text-sm line-clamp-2">  
          {project.description}  
        </p>

        {/* Metadata */}
        <div className="space-y-2 mb-4">  
          <div className="flex items-center gap-2 text-sm text-muted-foreground">  
            <Calendar className="h-3 w-3 flex-shrink-0" />  
            <span className="font-medium">Type:</span>  
            <span>{project.type}</span>  
          </div>  
          <div className="flex items-center gap-2 text-sm text-muted-foreground">  
            <Clock className="h-3 w-3 flex-shrink-0" />  
            <span className="font-medium">Duration:</span>  
            <span>{project.duration}</span>  
          </div>  
        </div>

        {/* Tools */}
        <div>  
          <p className="text-sm font-medium text-muted-foreground mb-2">Tools:</p>  
          <div className="flex flex-wrap gap-2">  
            {project.tools.slice(0, 3).map((tool, toolIndex) => (  
              <span  
                key={toolIndex}  
                className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium hover:bg-primary/20 transition-colors duration-200"  
              >  
                {tool}  
              </span>  
            ))}
            {project.tools.length > 3 && (
              <span className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs font-medium">
                +{project.tools.length - 3} more
              </span>
            )}
          </div>  
        </div>
      </div>
    </article>
  );
};

export default VideoScrollSection;