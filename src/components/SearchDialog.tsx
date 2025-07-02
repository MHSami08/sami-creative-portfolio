
import { useState, useEffect, useMemo } from 'react';
import { Search, X, ExternalLink, Calendar, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSoundEffects } from '@/hooks/useSoundEffects';

// Define search data structure for better performance
interface SearchItem {
  id: string;
  title: string;
  description: string;
  category: 'project' | 'section' | 'skill';
  url?: string;
  section?: string;
  keywords: string[];
}

// Optimized search data - easy to customize
const SEARCH_DATA: SearchItem[] = [
  // Projects
  {
    id: 'qalbi-nasheed',
    title: 'Qalbi Fil Madina Vocals Only',
    description: 'A beautiful Islamic Slowed & reverb nasheed',
    category: 'project',
    url: 'https://youtu.be/9ovxlUmrAEA?si=gj3cnKNddsWvqspO',
    keywords: ['nasheed', 'islamic', 'video', 'editing', 'qalbi', 'madina']
  },
  {
    id: 'c-tutorial',
    title: 'C Programming Tutorial Series',
    description: 'Educational content explaining C programming basics',
    category: 'project',
    keywords: ['programming', 'c', 'tutorial', 'education', 'coding']
  },
  {
    id: 'calculator',
    title: 'Simple Calculator in C',
    description: 'A basic calculator program demonstrating C fundamentals',
    category: 'project',
    keywords: ['c', 'calculator', 'programming', 'console', 'math']
  },
  // Sections
  {
    id: 'about',
    title: 'About Me',
    description: 'Learn about Masrafi Haque Sami\'s background',
    category: 'section',
    section: '#about',
    keywords: ['about', 'bio', 'background', 'masrafi', 'sami']
  },
  {
    id: 'portfolio',
    title: 'Portfolio',
    description: 'View all projects and work samples',
    category: 'section',
    section: '#portfolio',
    keywords: ['portfolio', 'projects', 'work', 'samples']
  },
  {
    id: 'services',
    title: 'Services',
    description: 'Available services and offerings',
    category: 'section',
    section: '#services',
    keywords: ['services', 'offerings', 'work', 'hire']
  },
  {
    id: 'contact',
    title: 'Contact',
    description: 'Get in touch for collaborations',
    category: 'section',
    section: '#contact',
    keywords: ['contact', 'email', 'collaboration', 'hire', 'youtube']
  },
  // Skills
  {
    id: 'video-editing',
    title: 'Video Editing',
    description: 'Professional video editing with Alight Motion',
    category: 'skill',
    keywords: ['video', 'editing', 'alight motion', 'motion graphics']
  },
  {
    id: 'programming',
    title: 'Programming',
    description: 'C programming and software development',
    category: 'skill',
    keywords: ['programming', 'c', 'development', 'coding']
  }
];

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchDialog = ({ isOpen, onClose }: SearchDialogProps) => {
  const [query, setQuery] = useState('');
  const { playSound } = useSoundEffects();

  // Optimized search with memoization
  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    
    const searchTerm = query.toLowerCase();
    return SEARCH_DATA.filter(item => 
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm))
    ).slice(0, 6); // Limit results for performance
  }, [query]);

  // Handle navigation to sections or external URLs
  const handleResultClick = (item: SearchItem) => {
    playSound('click');
    
    if (item.url) {
      // External link
      window.open(item.url, '_blank', 'noopener,noreferrer');
    } else if (item.section) {
      // Internal section
      const element = document.querySelector(item.section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    }
  };

  // Clear search when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setQuery('');
    }
  }, [isOpen]);

  // Get category styling
  const getCategoryStyle = (category: string) => {
    switch (category) {
      case 'project':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'section':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'skill':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            Search Portfolio
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, sections, or skills..."
              className="pl-10 pr-10"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-muted rounded"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto space-y-2">
            {query.trim() === '' ? (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Start typing to search...</p>
              </div>
            ) : filteredResults.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No results found for "{query}"</p>
              </div>
            ) : (
              filteredResults.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-all duration-200 group"
                  onClick={() => handleResultClick(item)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-sm group-hover:text-primary transition-colors truncate">
                          {item.title}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryStyle(item.category)}`}>
                          {item.category}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      {item.url ? (
                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      ) : (
                        <div className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Quick Tips */}
          {query.trim() === '' && (
            <div className="border-t pt-4">
              <p className="text-xs text-muted-foreground mb-2">Quick tips:</p>
              <div className="flex flex-wrap gap-2">
                {['projects', 'islamic', 'programming', 'video editing', 'contact'].map((tip) => (
                  <button
                    key={tip}
                    onClick={() => setQuery(tip)}
                    className="px-3 py-1 bg-muted hover:bg-muted/80 rounded-full text-xs transition-colors"
                  >
                    {tip}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
