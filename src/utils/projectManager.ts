// Centralized project management system
export interface VideoProject {
  id: number;
  title: string;
  description: string;
  category: 'long' | 'short';
  tools: string[];
  duration: string;
  type: string;
  videoUrl: string;
  thumbnail: string;
  detailedDescription: string;
  features: string[];
  status: 'completed' | 'planned' | 'learning';
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'mh_portfolio_projects';

// Initial projects data
const initialProjects: VideoProject[] = [
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
    thumbnail: "https://img.youtube.com/vi/9ovxlUmrAEA/maxresdefault.jpg",
    detailedDescription: "An inspiring Islamic nasheed featuring beautiful vocals with slowed and reverb effects. This project showcases video editing skills and attention to audio-visual harmony.",
    features: ["High-quality audio processing", "Professional video editing", "Islamic content creation"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "Surah An-Nisa(75-76)",
    description: "Advanced Quranic reel",
    category: "long",
    status: "completed",
    tools: ["Inshot", "Node video"],
    duration: "1:27 min",
    type: "Quranic reel",
    videoUrl: "https://youtu.be/1QN3Mid2gog?si=3G8n-4q1JdX5FOMH",
    thumbnail: "https://img.youtube.com/vi/1QN3Mid2gog/sddefault.jpg",
    detailedDescription: "Beautiful quranic inspirational reel to spread positive messages.",
    features: ["Advanced effects", "Smooth transition", "Inspirational content"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 5,
    title: "We compare to the yesterday,we don't compare to Zero",
    description: "Islamic Reminder",
    category: "short",
    status: "completed",
    tools: ["Capcut", "Inshot"],
    duration: "25 sec",
    type: "Shorts",
    videoUrl: "https://vimeo.com/1102973135",
    thumbnail: "https://i.postimg.cc/LsPVDcZq/IMG-20250721-093048.jpg",
    detailedDescription: "A beautiful Islamic short about gratification.",
    features: ["Caption edit", "Smooth transitions"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 6,
    title: "Islamic Reminder about DEATH",
    description: "High quality video edit",
    category: "short",
    status: "completed",
    tools: ["Inshot", "VN Video Editor"],
    duration: "40 sec",
    type: "Quote Reel",
    videoUrl: "https://vimeo.com/1103527078",
    thumbnail: "https://i.postimg.cc/ydzp33HG/thumb.jpg",
    detailedDescription: "Short reel for depressed muslim.",
    features: ["Advance effect", "Background effects"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 7,
    title: "Surah Al Haqqah(29-34)",
    description: "",
    category: "short",
    status: "completed",
    tools: ["Node Video Editor", "Alight motion"],
    duration: "1:08 min",
    type: "Reel",
    videoUrl: "https://vimeo.com/1116434062",
    thumbnail: "",
    detailedDescription: "",
    features: ["Professional video editing", "Islamic content creation"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 8,
    title: "Daily Reminder",
    description: "Short Islamic reminder for daily reflection",
    category: "short",
    status: "completed",
    tools: ["Inshot", "Alight Motion"],
    duration: "1:00 min",
    type: "Reminder Reel",
    videoUrl: "N/A",
    thumbnail: "https://i.postimg.cc/B6vdXZzW/IMG-20250721-092425.jpg",
    detailedDescription: "Daily Islamic reminder to keep faith strong and spirits high.",
    features: ["Text animation", "Islamic imagery", "Spiritual content"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Project management functions
export class ProjectManager {
  private static instance: ProjectManager;
  private projects: VideoProject[] = [];
  private listeners: ((projects: VideoProject[]) => void)[] = [];

  private constructor() {
    this.loadProjects();
  }

  static getInstance(): ProjectManager {
    if (!ProjectManager.instance) {
      ProjectManager.instance = new ProjectManager();
    }
    return ProjectManager.instance;
  }

  private loadProjects(): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        this.projects = JSON.parse(stored);
      } else {
        // Initialize with default projects
        this.projects = initialProjects;
        this.saveProjects();
      }
    } catch (error) {
      console.error('Error loading projects:', error);
      this.projects = initialProjects;
      this.saveProjects();
    }
  }

  private saveProjects(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.projects));
      this.notifyListeners();
    } catch (error) {
      console.error('Error saving projects:', error);
    }
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener([...this.projects]));
  }

  // Subscribe to project changes
  subscribe(listener: (projects: VideoProject[]) => void): () => void {
    this.listeners.push(listener);
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  // Get all projects
  getAllProjects(): VideoProject[] {
    return [...this.projects];
  }

  // Get projects by category
  getProjectsByCategory(category: 'long' | 'short'): VideoProject[] {
    return this.projects.filter(project => project.category === category);
  }

  // Get project by ID
  getProjectById(id: number): VideoProject | undefined {
    return this.projects.find(project => project.id === id);
  }

  // Add new project
  addProject(projectData: Omit<VideoProject, 'id' | 'createdAt' | 'updatedAt'>): VideoProject {
    const newProject: VideoProject = {
      ...projectData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.projects.push(newProject);
    this.saveProjects();
    return newProject;
  }

  // Update existing project
  updateProject(id: number, updates: Partial<VideoProject>): VideoProject | null {
    const index = this.projects.findIndex(project => project.id === id);
    if (index === -1) return null;

    this.projects[index] = {
      ...this.projects[index],
      ...updates,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString()
    };

    this.saveProjects();
    return this.projects[index];
  }

  // Delete project
  deleteProject(id: number): boolean {
    const index = this.projects.findIndex(project => project.id === id);
    if (index === -1) return false;

    this.projects.splice(index, 1);
    this.saveProjects();
    return true;
  }

  // Clear all projects (for testing)
  clearAllProjects(): void {
    this.projects = [];
    this.saveProjects();
  }

  // Reset to initial projects
  resetToDefaults(): void {
    this.projects = [...initialProjects];
    this.saveProjects();
  }
}

// Hook for using project manager in React components
export const useProjectManager = () => {
  return ProjectManager.getInstance();
};
