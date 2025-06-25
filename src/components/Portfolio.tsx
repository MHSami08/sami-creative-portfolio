
import { useState } from 'react';
import { ExternalLink, Github, Play, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: "Qalbi Fil Madina Vocals Only",
      description: "A beautiful Islamic Slowed & reverb nasheed",
      category: "video",
      status: "completed",
      tools: ["VN Video Editor", "Alight motion"],
      duration: "3-5 min",
      type: "Nasheed Video",
      videoUrl: "https://youtu.be/9ovxlUmrAEA?si=gj3cnKNddsWvqspO"
    },
    {
      id: 2,
      title: "C Programming Tutorial Series",
      description: "Educational content explaining C programming basics for beginners",
      category: "programming",
      status: "planned", 
      tools: ["C", "Code::Blocks", "OBS Studio"],
      duration: "10-15 min",
      type: "Educational"
    },
    {
      id: 3,
      title: "Islamic Quotes Motion Graphics",
      description: "Animated inspirational quotes from Quran and Hadith",
      category: "video",
      status: "planned",
      tools: ["After Effects", "Illustrator"],
      duration: "1-2 min",
      type: "Motion Graphics"
    },
    {
      id: 4,
      title: "Simple Calculator in C",
      description: "A basic calculator program demonstrating C programming fundamentals",
      category: "programming", 
      status: "learning",
      tools: ["C", "Terminal"],
      duration: "N/A",
      type: "Console App"
    }
  ];

  const filters = [
    { id: 'all', name: 'All Projects' },
    { id: 'video', name: 'Video Editing' },
    { id: 'programming', name: 'Programming' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

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

  return (
    <section className="py-20 bg-background" id="portfolio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            My <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            I'm currently learning and building my skills. Here's what I'm planning to create, In shaa Allah.
          </p>
          
          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeFilter === filter.id
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-card rounded-xl border border-border p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                </div>
                <div className="ml-4">
                  {project.category === 'video' ? (
                    <Play className="h-8 w-8 text-blue-500" />
                  ) : (
                    <Github className="h-8 w-8 text-amber-500" />
                  )}
                </div>
              </div>

              {/* Project details */}
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {project.description}
              </p>

              {/* Project metadata */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span className="font-medium">Type:</span>
                  <span>{project.type}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium">Duration:</span>
                  <span>{project.duration}</span>
                </div>
              </div>

              {/* Tools used */}
              <div className="mb-6">
                <p className="text-sm font-medium text-muted-foreground mb-2">Tools & Technologies:</p>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool, toolIndex) => (
                    <span
                      key={toolIndex}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-md text-sm font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                {project.status === 'completed' && project.videoUrl ? (
  <a
    href={project.videoUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="flex-1"
  >
    <Button variant="outline" size="sm" className="w-full">
      <ExternalLink className="h-4 w-4 mr-2" />
      View Project
    </Button>
  </a>
) : (
  <Button variant="outline" size="sm" className="flex-1" disabled>
    <ExternalLink className="h-4 w-4 mr-2" />
    Coming Soon
  </Button>
)}
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center animate-fade-in bg-card rounded-2xl border border-border p-8">
          <h3 className="text-2xl font-bold mb-4">
            Interested in Collaboration?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            I'm always open to learning opportunities and small projects. 
            Feel free to reach out if you'd like to work together or have any suggestions!
          </p>
          <Button 
            onClick={scrollToContact}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
          >
            Get In Touch
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
