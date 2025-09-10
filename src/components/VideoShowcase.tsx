import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Filter, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VideoPlayer from '@/components/VideoPlayer';

interface VideoShowcaseProps {
  language: 'en' | 'bn';
}

const VideoShowcase = ({ language }: VideoShowcaseProps) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string; isShortVideo: boolean } | null>(null);

  const content = {
    en: {
      title: "Portfolio Showcase",
      subtitle: "Cinematic stories that inspire",
      filters: {
        all: "All Projects",
        ads: "Advertisements",
        reels: "Social Reels",
        films: "Short Films",
        docs: "Documentaries"
      }
    },
    bn: {
      title: "পোর্টফোলিও প্রদর্শনী",
      subtitle: "অনুপ্রেরণাদায়ক সিনেমাটিক গল্প",
      filters: {
        all: "সব প্রকল্প",
        ads: "বিজ্ঞাপন",
        reels: "সামাজিক রিল",
        films: "শর্ট ফিল্ম",
        docs: "তথ্যচিত্র"
      }
    }
  };

  const text = content[language];

  const projects = [
    {
      id: 1,
      title: "Islamic Inspiration Reel",
      category: "reels",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      duration: "0:30",
      isShortVideo: true
    },
    {
      id: 2,
      title: "Community Service Documentary",
      category: "docs",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      duration: "5:20",
      isShortVideo: false
    },
    {
      id: 3,
      title: "Ramadan Promotion",
      category: "ads",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      duration: "1:15",
      isShortVideo: false
    },
    {
      id: 4,
      title: "Hajj Journey Short Film",
      category: "films",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      duration: "3:45",
      isShortVideo: false
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const filterButtons = [
    { key: 'all', label: text.filters.all },
    { key: 'ads', label: text.filters.ads },
    { key: 'reels', label: text.filters.reels },
    { key: 'films', label: text.filters.films },
    { key: 'docs', label: text.filters.docs }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-gray-900/20" id="portfolio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              {text.title}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {text.subtitle}
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filterButtons.map((filter) => (
            <Button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              variant={activeFilter === filter.key ? "default" : "outline"}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                activeFilter === filter.key
                  ? "bg-gradient-to-r from-emerald-500 to-blue-600 text-white shadow-lg hover:shadow-xl"
                  : "border-emerald-400/30 text-emerald-400 hover:bg-emerald-500/10"
              }`}
            >
              <Filter className="w-4 h-4 mr-2" />
              {filter.label}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group relative bg-gray-900/50 rounded-2xl overflow-hidden backdrop-blur-lg border border-gray-700/50 hover:border-emerald-400/50 transition-all duration-500 hover:scale-105 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelectedVideo({
                url: project.videoUrl,
                title: project.title,
                isShortVideo: project.isShortVideo
              })}
              layout
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-lg border border-white/30 hover:bg-white/30 transition-all duration-300">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                </div>

                {/* Duration */}
                <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-sm font-medium">
                  {project.duration}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Eye className="w-4 h-4" />
                  <span className="capitalize">{project.category}</span>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
            </motion.div>
          ))}
        </motion.div>

        {/* Video Player Modal */}
        <VideoPlayer
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          videoUrl={selectedVideo?.url || ''}
          title={selectedVideo?.title || ''}
          isShortVideo={selectedVideo?.isShortVideo || false}
        />
      </div>
    </section>
  );
};

export default VideoShowcase;