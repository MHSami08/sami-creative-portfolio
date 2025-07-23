import { useState, useEffect } from 'react';
import { ExternalLink, Github, Play, Calendar, Clock, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import VideoPlayer from '@/components/VideoPlayer';
import { useProjects } from '@/hooks/useProjects';
import { VideoProject } from '@/utils/projectManager';

const Portfolio = () => {
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string; isShortVideo: boolean } | null>(null);
  const { projects, loading, longVideos, shortVideos } = useProjects();

  // Helper function for auto thumbline
  const getYouTubeThumbnail = (url: string) => {
  const videoId = url.includes('youtu.be')
    ? url.split('youtu.be/')[1]?.split('?')[0]
    : url.split('v=')[1]?.split('&')[0];

  return videoId ? `https://img.youtube.com/vi/${videoId}/sddefault.jpg` : '';
};

// Helper function to get YouTube embed URL
const getYouTubeEmbedUrl = (url: string) => {
  const videoId = url.includes('youtu.be') 
    ? url.split('youtu.be/')[1]?.split('?')[0]
    : url.split('v=')[1]?.split('&')[0];
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
};

// Helper function to get Vimeo embed URL
const getVimeoEmbedUrl = (url: string) => {
  const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1];
  return videoId ? `https://player.vimeo.com/video/${videoId}` : null;
};

const getStatusColor = (status: string) => {
switch (status) {
case 'planned': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
case 'learning': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
}
};

const scrollToContact = () => {
const element = document.querySelector('#contact');
if (element) {
element.scrollIntoView({ behavior: 'smooth' });
}
};

const handleProjectClick = (project: VideoProject) => {
if (project.status === 'completed' && project.videoUrl && project.videoUrl !== 'N/A') {
setSelectedVideo({ 
  url: project.videoUrl, 
  title: project.title,
  isShortVideo: project.category === 'short'
});
}
};

if (loading) {
return <div className="py-20 text-center">
<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
</div>;
}
return (
<section className="py-12 sm:py-20 bg-background" id="portfolio">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
        {/* Long Videos Section */}
        <div className="mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-center">
            Long <span className="text-blue-500">videos</span>
          </h3>
          <p className="text-muted-foreground text-center mb-8">Extended content with cinematic storytelling</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {longVideos.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No long videos available yet.</p>
              </div>
            ) : (
            {longVideos.map((project, index) => (
<article  
key={project.id}  
className={`group bg-card rounded-xl border border-border overflow-hidden transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-primary/10 hover:scale-[1.01] hover:-translate-y-1 animate-fade-in ${
project.status === 'completed' && project.videoUrl ? 'cursor-pointer' : 'cursor-default'
} dark:hover:border-cyan-400 dark:hover:shadow-cyan-400/20 dark:hover:shadow-lg`}
style={{ animationDelay: `${index * 0.1}s` }}
role="article"
aria-label={`Project: ${project.title}`}
onClick={() => handleProjectClick(project)}
>  
                {/* Video Thumbnail for Long Videos */}
                <div className="relative overflow-hidden">
                  <img 
  src={project.videoUrl.includes('youtu') ? getYouTubeThumbnail(project.videoUrl) : project.thumbnail}
  alt={`${project.title} thumbnail`}
  className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {project.status === 'completed' && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Ready to Watch
                      </span>
                    </div>
                  )}
                </div>

<div className="p-4 sm:p-6">
{/* Project header */}  
<div className="flex items-start justify-between mb-4">  
<div className="flex-1 min-w-0">
<HoverCard>
<HoverCardTrigger asChild>
<h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300 cursor-pointer truncate pr-2">  
{project.title}  
</h3>
</HoverCardTrigger>
<HoverCardContent className="w-80 sm:w-96 p-4 sm:p-6 bg-card border border-border shadow-xl" side="top">
<div className="space-y-3 sm:space-y-4">
<div className="flex items-center gap-2 mb-2">
<Eye className="h-4 w-4 text-primary" />
<h4 className="font-semibold text-sm sm:text-base">{project.title}</h4>
</div>
<p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
{project.detailedDescription}
</p>
<div className="space-y-2">
<h5 className="font-medium text-sm">Key Features:</h5>
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
<span className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(project.status)}`}>  
{project.status.charAt(0).toUpperCase() + project.status.slice(1)}  
</span>  
</div>  
                <div className="ml-2 sm:ml-4 flex-shrink-0">  
                  <Play className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 group-hover:scale-110 transition-transform duration-300" />  
                </div>
</div>  

{/* Project details */}  
<p className="text-muted-foreground mb-4 leading-relaxed text-sm sm:text-base">  
{project.description}  
</p>  

{/* Project metadata */}  
<div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">  
<div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">  
<Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />  
<span className="font-medium">Type:</span>  
<span>{project.type}</span>  
</div>  
<div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">  
<Clock className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />  
<span className="font-medium">Duration:</span>  
<span>{project.duration}</span>  
</div>  
</div>  

{/* Tools used */}  
<div className="mb-4 sm:mb-6">  
<p className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">Tools & Technologies:</p>  
<div className="flex flex-wrap gap-1.5 sm:gap-2">  
{project.tools.map((tool, toolIndex) => (  
<span  
key={toolIndex}  
className="px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-md text-xs sm:text-sm font-medium hover:bg-primary/20 transition-colors duration-200"  
>  
{tool}  
</span>  
))}  
</div>  
</div>  
                </div>
              </article>  
            ))}  
            )}
          </div>
        </div>

        {/* Short Videos Section */}
        <div className="mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-center">
            Short <span className="text-blue-500">videos</span>
          </h3>
          <p className="text-muted-foreground text-center mb-8">Quick impactful content</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 max-w-sm md:max-w-4xl mx-auto gap-6 sm:gap-8">
            {shortVideos.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No short videos available yet.</p>
              </div>
            ) : (
            {shortVideos.map((project, index) => (
              <article  
                key={project.id}  
                className={`group bg-card rounded-xl border border-border overflow-hidden transition-all duration-200 ease-out hover:shadow-md ${
                  project.status === 'completed' && project.videoUrl && project.videoUrl !== 'N/A' ? 'cursor-pointer' : 'cursor-default'
                } hover:border-primary/20`}
                style={{ animationDelay: `${index * 0.1}s` }}
                role="article"
                aria-label={`Project: ${project.title}`}
                onClick={() => project.status === 'completed' && project.videoUrl && project.videoUrl !== 'N/A' && handleProjectClick(project)}
              >  
                {/* Short Video Thumbnail */}
                <div className="relative overflow-hidden">
                  <img 
                    src={project.thumbnail} 
                    alt={`${project.title} thumbnail`}
                    className="w-full aspect-[9/16] object-cover transition-transform duration-200 group-hover:scale-102"
                  />
                  {project.status === 'completed' && (
                    <div className="absolute top-2 right-2">
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Ready
                      </span>
                    </div>
                  )}
                  <div className="p-4">
                    <h4 className="text-foreground text-base font-semibold mb-1 line-clamp-2">{project.title}</h4>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>{project.type}</span>
                      <span>{project.duration}</span>
                    </div>
                  </div>
                </div>
              </article>  
            ))}  
            )}
          </div>
        </div>

{/* Call to action */}  
<div className="text-center animate-fade-in bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-all duration-300">  
<h3 className="text-xl font-bold mb-3">  
Ready to Collaborate?  
</h3>  
<p className="text-muted-foreground mb-4 max-w-lg mx-auto text-sm leading-relaxed">  
Open for projects and collaborations. Let's create something amazing together!  
</p>  
<Button   
onClick={scrollToContact}  
className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 text-sm hover:scale-105 transition-all duration-200"  
aria-label="Contact me for collaboration"
>  
Get In Touch  
</Button>  
</div>
</div>

        {/* Video Player Modal */}
        <VideoPlayer
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          videoUrl={selectedVideo?.url || ''}
          title={selectedVideo?.title || ''}
          isShortVideo={selectedVideo?.isShortVideo || false}
        />
</section>
);
};

export default Portfolio;
