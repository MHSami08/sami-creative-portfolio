
import { Play, ExternalLink, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Portfolio = () => {
  const futureProjects = [
    {
      title: "Islamic Content Editing",
      description: "Future Islamic educational and inspirational video content",
      type: "Video Editing",
      status: "planned"
    },
    {
      title: "C Programming Projects",
      description: "Simple programs and algorithms as I learn C programming",
      type: "Programming",
      status: "learning"
    },
    {
      title: "YouTube Channel Content",
      description: "Educational and creative videos for my YouTube channel",
      type: "Video Content",
      status: "planned"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Portfolio</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I'm currently building my portfolio. Here's what I'm working towards and learning.
          </p>
        </div>

        {/* Current Status */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-6 py-3 rounded-full">
            <Clock className="h-5 w-5" />
            <span className="font-medium">Currently Learning & Building</span>
          </div>
        </div>

        {/* Future Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {futureProjects.map((project, index) => (
            <div 
              key={index}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Play className="h-6 w-6 text-primary" />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  project.status === 'learning' 
                    ? 'bg-accent/10 text-accent' 
                    : 'bg-primary/10 text-primary'
                }`}>
                  {project.status === 'learning' ? 'Learning' : 'Planned'}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-muted-foreground mb-4">{project.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-primary">{project.type}</span>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>

        {/* Commitment Message */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-8 border border-primary/20">
            <h3 className="text-2xl font-bold mb-4 text-primary">In shaa Allah</h3>
            <p className="text-muted-foreground mb-6">
              I'm currently learning and will update this section soon with my completed projects. 
              Every step of my journey is taken with dedication and the intention to create 
              meaningful, high-quality content.
            </p>
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => window.scrollTo({ top: document.querySelector('#contact')?.offsetTop || 0, behavior: 'smooth' })}
            >
              Get in Touch for Collaboration
            </Button>
          </div>
        </div>

        {/* Social Media Integration */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold mb-6">Follow My Journey</h3>
          <div className="flex justify-center gap-6">
            <a 
              href="https://youtube.com/@MH_officialYT" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              <Play className="h-5 w-5" />
              YouTube: MH_officialYT
            </a>
            <a 
              href="https://tiktok.com/@MH_officialYT" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-black hover:bg-gray-800 text-white rounded-lg transition-colors"
            >
              <Play className="h-5 w-5" />
              TikTok: MH_officialYT
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
