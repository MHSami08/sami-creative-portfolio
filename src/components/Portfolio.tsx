import { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Portfolio = () => {
  const longVideos = [
    {
      id: 1,
      title: "Qalbi Fil Madina Vocals Only",
      description: "A beautiful Islamic Slowed & reverb nasheed",
      status: "completed",
      duration: "3:29 min",
      thumbnail: "https://img.youtube.com/vi/9ovxlUmrAEA/maxresdefault.jpg"
    },
    {
      id: 2,
      title: "Surah An-Nisa(75-76)",
      description: "Advanced Quranic reel",
      status: "completed",
      duration: "1:27 min",
      thumbnail: "https://img.youtube.com/vi/1QN3Mid2gog/maxresdefault.jpg"
    },
    {
      id: 3,
      title: "Islamic Motivation Video",
      description: "Inspiring Islamic content with beautiful visuals",
      status: "completed",
      duration: "2:15 min",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
    }
  ];

  const shortVideos = [
    {
      id: 4,
      title: "We compare to the yesterday, we don't compare to Zero",
      duration: "25 sec",
      thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=1067&fit=crop&crop=center"
    },
    {
      id: 5,
      title: "Islamic Short Quote",
      duration: "0:45 min",
      thumbnail: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=600&h=1067&fit=crop&crop=center"
    },
    {
      id: 6,
      title: "Daily Reminder",
      duration: "1:00 min",
      thumbnail: "https://images.unsplash.com/photo-1564769625392-651b2049ce4b?w=600&h=1067&fit=crop&crop=center"
    }
  ];

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 sm:py-20 bg-background" id="portfolio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            My <span className="gradient-text">Portfolio</span>
          </h2>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-center">Long <span className="text-blue-500">Videos</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {longVideos.map((video) => (
              <article key={video.id} className="bg-card rounded-xl border border-border overflow-hidden">
                <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">{video.title}</h3>
                  <p className="text-muted-foreground mb-2">{video.description}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-4 w-4" /> {video.duration}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-center">Short <span className="text-blue-500">Videos</span></h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {shortVideos.map((video) => (
              <article key={video.id} className="bg-card rounded-xl border border-border overflow-hidden">
                <img src={video.thumbnail} alt={video.title} className="w-full aspect-[9/16] object-cover" />
                <div className="p-4">
                  <h3 className="text-sm font-bold">{video.title}</h3>
                  <p className="text-xs text-muted-foreground">{video.duration}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="text-center animate-fade-in bg-card rounded-2xl border border-border p-6 sm:p-8 hover:shadow-xl transition-all duration-300">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
            Interested in Collaboration?
          </h3>
          <p className="text-muted-foreground mb-4 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            I'm always open to learning opportunities and small projects. Feel free to reach out if you'd like to work together or have any suggestions!
          </p>
          <Button onClick={scrollToContact} className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base">
            Get In Touch
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
