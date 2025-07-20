import { useState } from 'react'; import { Play } from 'lucide-react'; import { Button } from '@/components/ui/button'; import VideoPlayer from './VideoPlayer';

const Portfolio = () => { const [selectedVideo, setSelectedVideo] = useState(null);

const longVideos = [ { id: 1, title: "Qalbi Fil Madina Vocals Only", videoUrl: "https://youtu.be/9ovxlUmrAEA?si=gj3cnKNddsWvqspO", thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&h=600&fit=crop&crop=center", category: 'long', duration: '3:29 min' } ];

const shortVideos = [ { id: 2, title: "Surah An-Nisa(75-76)", videoUrl: "https://vimeo.com/123456789", thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=1200&fit=crop&crop=center", category: 'short', duration: '1:27 min' } ];

const handleProjectClick = (project) => { setSelectedVideo({ url: project.videoUrl, title: project.title, isShortVideo: project.category === 'short' }); };

return ( <section className="py-12 sm:py-20 bg-gradient-to-b from-background to-background/90 backdrop-blur" id="portfolio"> <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <h2 className="text-4xl font-bold mb-12 text-center">My <span className="gradient-text">Portfolio</span></h2>

<h3 className="text-2xl font-bold mb-4 text-center">Long Videos</h3>
    <div className="grid grid-cols-1 gap-8 mb-16">
      {longVideos.map(project => (
        <article key={project.id} onClick={() => handleProjectClick(project)}
          className="group bg-card rounded-xl border overflow-hidden transition-all hover:shadow-xl cursor-pointer">
          <img src={project.thumbnail} alt="thumbnail"
            className="w-full h-96 object-cover" />
          <div className="p-4">
            <h3 className="text-xl font-bold">{project.title}</h3>
            <p className="text-muted-foreground">{project.duration}</p>
          </div>
        </article>
      ))}
    </div>

    <h3 className="text-2xl font-bold mb-4 text-center">Short Videos</h3>
    <div className="flex flex-col gap-8">
      {shortVideos.map(project => (
        <article key={project.id} onClick={() => handleProjectClick(project)}
          className="group bg-card rounded-xl border overflow-hidden transition-all hover:shadow-xl cursor-pointer">
          <img src={project.thumbnail} alt="thumbnail"
            className="w-full h-[600px] object-cover" />
          <div className="p-4">
            <h3 className="text-xl font-bold">{project.title}</h3>
            <p className="text-muted-foreground">{project.duration}</p>
          </div>
        </article>
      ))}
    </div>

    <div className="text-center mt-16">
      <Button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
        Get In Touch
      </Button>
    </div>
  </div>

  <VideoPlayer
    isOpen={!!selectedVideo}
    onClose={() => setSelectedVideo(null)}
    videoUrl={selectedVideo?.url || ''}
    title={selectedVideo?.title || ''}
    isShortVideo={selectedVideo?.isShortVideo || false}
  />
</section>

); };

export default Portfolio;
