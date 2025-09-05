import { Play, ExternalLink, Clock, Award, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useProjects } from '@/hooks/useProjects';
import HorizontalVideoScroll from './HorizontalVideoScroll';

const Portfolio = () => {
  const { projects, longVideos, shortVideos, loading } = useProjects();

  // Create review videos from regular projects for demo
  const reviewVideos = projects.slice(0, 2).map(project => ({
    id: project.id + 1000,
    title: `${project.title} - Behind the Scenes`,
    description: `Review and breakdown of the ${project.title} project creation process`,
    thumbnail: project.thumbnail,
    videoUrl: project.videoUrl,
    category: 'review' as const,
    duration: '8:30',
    tools: project.tools
  }));

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-background to-blue-900/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading portfolio...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-background via-blue-900/5 to-purple-900/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f6/05_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6/05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
              My Video Portfolio
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore my video editing journey through different formats and styles. From long-form content to quick social media videos.
            </p>
          </div>
        </div>

        {/* Long Videos Section */}
        <HorizontalVideoScroll
          videos={longVideos}
          title="Long Form Videos"
          className="mb-16"
        />

        {/* Short Videos Section */}
        <HorizontalVideoScroll
          videos={shortVideos}
          title="Short Form Content"
          className="mb-16"
        />

        {/* Review Videos Section */}
        <HorizontalVideoScroll
          videos={reviewVideos}
          title="Project Reviews"
          className="mb-16"
        />

        {/* Stats Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="bg-card/80 backdrop-blur-sm border-blue-400/30 text-center">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-2">
                  <Play className="h-6 w-6 text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-blue-400">{longVideos.length}</div>
                <div className="text-sm text-muted-foreground">Long Videos</div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/80 backdrop-blur-sm border-emerald-400/30 text-center">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="h-6 w-6 text-emerald-400" />
                </div>
                <div className="text-2xl font-bold text-emerald-400">{shortVideos.length}</div>
                <div className="text-sm text-muted-foreground">Short Videos</div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-purple-400/30 text-center">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-2">
                  <Award className="h-6 w-6 text-purple-400" />
                </div>
                <div className="text-2xl font-bold text-purple-400">{reviewVideos.length}</div>
                <div className="text-sm text-muted-foreground">Reviews</div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-amber-400/30 text-center">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-2">
                  <Calendar className="h-6 w-6 text-amber-400" />
                </div>
                <div className="text-2xl font-bold text-amber-400">2025</div>
                <div className="text-sm text-muted-foreground">Started</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-primary/20 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Create Something Amazing?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Whether you have a vision for a long-form documentary, need quick social media content, or want a detailed project review, let's collaborate to bring your ideas to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  Start a Project
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => window.open('https://youtube.com/@mhsami-08?si=u3EFol8eZyvqnfzw', '_blank')}
                  className="border-primary/30"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Channel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;