import { useState } from 'react';
import { ExternalLink, Github, Play, Calendar, Clock, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import VideoPlayer from './VideoPlayer';

const Portfolio = () => {
const [activeFilter, setActiveFilter] = useState('all');
const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string; isShortVideo: boolean } | null>(null);

const longVideos = [
{
id: 1,
title: "Qalbi Fil Madina Vocals Only",
description: "A beautiful Islamic Slowed & reverb nasheed",
category: "long",
status: "completed",
tools: ["VN Video Editor", "Alight motion"],
duration: "3:29 min",
type: "Nasheed Video",
videoUrl: "https://youtu.be/9ovxlUmrAEA?si=gj3cnKNddsWvqspO",
thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&h=450&fit=crop&crop=center",
detailedDescription: "An inspiring Islamic nasheed featuring beautiful vocals with slowed and reverb effects. This project showcases video editing skills and attention to audio-visual harmony.",
features: ["High-quality audio processing", "Professional video editing", "Islamic content creation"]
},
{
id: 3,
title: "Islamic Motivation Video",
description: "Inspiring Islamic content with beautiful visuals",
category: "long",
status: "completed",
tools: ["CapCut", "Canva"],
duration: "2:15 min",
type: "Motivational Video",
videoUrl: "https://youtu.be/example3",
thumbnail: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&h=450&fit=crop&crop=center",
detailedDescription: "An uplifting Islamic motivational video designed to inspire and remind viewers of their faith and purpose.",
features: ["Emotional storytelling", "Professional transitions", "Islamic calligraphy"]
},
{
id: 4,
title: "Wedding Highlights Reel",
description: "Beautiful wedding moments captured in cinematic style",
category: "long",
status: "completed",
tools: ["DaVinci Resolve", "After Effects"],
duration: "4:30 min",
type: "Wedding Video",
videoUrl: "https://youtu.be/example4",
thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=450&fit=crop&crop=center",
detailedDescription: "A cinematic wedding highlights reel capturing the most precious moments of a couple's special day with professional editing and color grading.",
features: ["Cinematic color grading", "Smooth transitions", "Emotional storytelling"]
}
];

const shortVideos = [
{
id: 2,
title: "Surah An-Nisa(75-76)",
description: "Advanced Quranic reel",
category: "short",
status: "completed",
tools: ["Inshot", "Node video"],
duration: "1:27 min",
type: "Quranic reel",
videoUrl: "https://vt.tiktok.com/ZSHg1ULVHakoD-jhTIP/",
thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=600&h=1067&fit=crop&crop=center",
detailedDescription: "Beautiful quranic inspirational reel to spread positive messages.",
features: ["Advanced effects", "Smooth transition", "Inspirational content"]
},
{
id: 5,
title: "Islamic Short Quote",
description: "Motivational Islamic quote reel",
category: "short",
status: "completed",
tools: ["CapCut", "Canva"],
duration: "0:45 min",
type: "Quote Reel",
videoUrl: "https://www.tiktok.com/@example/video/1234567890",
thumbnail: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=600&h=1067&fit=crop&crop=center",
detailedDescription: "Short inspirational Islamic quote with beautiful typography and background.",
features: ["Typography animation", "Background effects", "Quote presentation"]
},
{
id: 6,
title: "Daily Reminder",
description: "Short Islamic reminder for daily reflection",
category: "short",
status: "completed",
tools: ["Inshot", "Alight Motion"],
duration: "1:00 min",
type: "Reminder Reel",
videoUrl: "https://www.tiktok.com/@example/video/9876543210",
thumbnail: "https://images.unsplash.com/photo-1564769625392-651b2049ce4b?w=600&h=1067&fit=crop&crop=center",
detailedDescription: "Daily Islamic reminder to keep faith strong and spirits high.",
features: ["Text animation", "Islamic imagery", "Spiritual content"]
}
];

const allProjects = [...longVideos, ...shortVideos];

const filteredProjects = activeFilter === 'all'
? allProjects
: allProjects.filter(project => project.category === activeFilter);

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

const handleProjectClick = (project: typeof allProjects[0]) => {
if (project.status === 'completed' && project.videoUrl) {
setSelectedVideo({ 
  url: project.videoUrl, 
  title: project.title,
  isShortVideo: project.category === 'short'
});
}
};

return (
<section className="py-0 bg-background" id="portfolio">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            My <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
            Showcasing my video editing projects and creative work. Each project reflects my passion for storytelling and visual creativity.
          </p>
        </div>

        {/* Long Videos Section */}
        <div className="mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-center">
            Long <span className="text-blue-500">videos</span>
          </h3>
          <p className="text-muted-foreground text-center mb-8">Extended content with cinematic storytelling</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
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
                {/* Video Thumbnail */}
                {(project.category === 'long' || project.category === 'short') && (
<div className="relative overflow-hidden">
<img 
src={project.thumbnail} 
alt={`${project.title} thumbnail`}
className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
/>
<div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
<div className="bg-red-600/90 backdrop-blur-sm rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
<Play className="h-8 w-8 text-white" fill="white" />
</div>
</div>
{project.status === 'completed' && (
<div className="absolute top-3 right-3">
<span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
Ready to Watch
</span>
</div>
)}
</div>
)}

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
          </div>
        </div>

        {/* Short Videos Section */}
        <div className="mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-center">
            Short <span className="text-blue-500">videos</span>
          </h3>
          <p className="text-muted-foreground text-center mb-8">Quick impactful content for social media</p>
          
          <div className="max-w-2xl mx-auto space-y-6">
            {shortVideos.map((project, index) => (
              <article  
                key={project.id}  
                className={`group bg-card rounded-xl border border-border overflow-hidden transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-primary/10 hover:scale-[1.01] hover:-translate-y-1 animate-fade-in cursor-pointer
                dark:hover:border-cyan-400 dark:hover:shadow-cyan-400/20 dark:hover:shadow-lg`}
                style={{ animationDelay: `${index * 0.1}s` }}
                role="article"
                aria-label={`Project: ${project.title}`}
                onClick={() => handleProjectClick(project)}
              >  
                {/* Video Thumbnail - 9:16 ratio */}
                <div className="relative overflow-hidden mx-auto max-w-sm">
                  <img 
                    src={project.thumbnail} 
                    alt={`${project.title} thumbnail`}
                    className="w-full aspect-[9/16] object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="bg-red-600/90 backdrop-blur-sm rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
                      <Play className="h-8 w-8 text-white" fill="white" />
                    </div>
                  </div>
                  {project.status === 'completed' && (
                    <div className="absolute top-2 right-2">
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Ready
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 right-2">
                    <h4 className="text-white text-sm font-semibold mb-1 line-clamp-2">{project.title}</h4>
                    <p className="text-white/80 text-xs">{project.duration}</p>
                  </div>
                </div>
              </article>  
            ))}  
          </div>
        </div>

{/* Call to action */}  
<div className="text-center animate-fade-in bg-card rounded-2xl border border-border p-6 sm:p-8 hover:shadow-xl transition-all duration-300">  
<h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">  
Interested in Collaboration?  
</h3>  
<p className="text-muted-foreground mb-4 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">  
I'm always open to learning opportunities and small projects.   
Feel free to reach out if you'd like to work together or have any suggestions!  
</p>  
<Button   
onClick={scrollToContact}  
className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base hover:scale-105 transition-all duration-200"  
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