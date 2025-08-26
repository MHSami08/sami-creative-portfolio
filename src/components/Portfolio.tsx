import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import VideoPlayer from '@/components/VideoPlayer';
import VideoScrollSection from '@/components/VideoScrollSection';
import { useProjects } from '@/hooks/useProjects';
import { VideoProject } from '@/utils/projectManager';
import { useMouseTracking } from '@/hooks/useMouseTracking';

const Portfolio = () => {
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string; isShortVideo: boolean } | null>(null);
  const { projects, loading, longVideos, shortVideos } = useProjects();
  const portfolioRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  const { getParallaxTransform } = useMouseTracking({ 
    ref: portfolioRef, 
    intensity: 5 
  });

  const { getTransform: getCtaTransform } = useMouseTracking({ 
    ref: ctaRef, 
    intensity: 3 
  });

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
    return (
      <div className="py-20 text-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/30 border-t-primary mx-auto"></div>
          <div className="animate-ping absolute inset-0 rounded-full h-16 w-16 border-4 border-primary/20 mx-auto"></div>
        </div>
        <p className="text-muted-foreground mt-6 text-lg">Loading amazing content...</p>
      </div>
    );
  }

  return (
    <section 
      ref={portfolioRef}
      className="py-20 bg-background relative overflow-hidden" 
      id="portfolio"
    >
      {/* 3D Background Elements */}
      <div className="absolute inset-0 geometric-pattern-3d opacity-30"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl animate-float-3d"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-amber-500/5 to-red-500/5 rounded-full blur-3xl animate-float-3d" style={{ animationDelay: '3s' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Portfolio Header */}
        <div className="text-center mb-20">
          <h2 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 gradient-text-3d"
            style={{ transform: getParallaxTransform(0.3) }}
          >
            My Creative Work
          </h2>
          <p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            style={{ transform: getParallaxTransform(0.5) }}
          >
            Discover my journey in video editing and content creation, showcasing both long-form and short-form content with Islamic values.
          </p>
        </div>

        {/* Long Videos Horizontal Scroll Section */}
        <VideoScrollSection
          title="Long Videos"
          subtitle="Extended content with cinematic storytelling and deep narratives"
          videos={longVideos}
          onVideoClick={handleProjectClick}
          isShortVideo={false}
        />

        {/* Short Videos Horizontal Scroll Section */}
        <VideoScrollSection
          title="Short Videos"
          subtitle="Quick impactful content designed for maximum engagement"
          videos={shortVideos}
          onVideoClick={handleProjectClick}
          isShortVideo={true}
        />

        {/* Review Videos Section (Future) */}
        <VideoScrollSection
          title="Review Videos"
          subtitle="In-depth analysis and reviews of products, services, and experiences"
          videos={[]} // Empty for now, will be populated later
          onVideoClick={handleProjectClick}
          isShortVideo={false}
        />

        {/* Enhanced Call to Action */}
        <div 
          ref={ctaRef}
          className="text-center card-3d bg-gradient-to-br from-card via-card to-card/50 backdrop-blur-sm rounded-3xl border border-border/50 p-12 shadow-2xl"
          style={{ transform: getCtaTransform() }}
        >
          <div className="space-y-6">
            <h3 className="text-3xl sm:text-4xl font-bold gradient-text-3d">
              Ready to Collaborate?
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Whether you have a creative vision or need help bringing your ideas to life, I'm here to help. 
              Let's create something amazing together, In shaa Allah.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                onClick={scrollToContact}
                className="premium-button bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-10 py-6 text-lg rounded-2xl font-semibold shadow-2xl shadow-blue-500/30 transition-all duration-500"
                size="lg"
              >
                Start a Project
              </Button>
              <Button 
                variant="outline"
                onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
                className="premium-button border-2 border-primary/50 text-primary hover:text-white px-10 py-6 text-lg rounded-2xl font-semibold backdrop-blur-sm bg-background/50 transition-all duration-500"
                size="lg"
              >
                Learn More
              </Button>
            </div>
          </div>
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