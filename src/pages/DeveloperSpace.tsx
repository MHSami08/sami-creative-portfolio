import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface VideoProject {
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
}

const DeveloperSpace = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [projects, setProjects] = useState<VideoProject[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProject, setEditingProject] = useState<VideoProject | null>(null);
  const { toast } = useToast();

  // Simple password protection
  const ADMIN_PASSWORD = "admin123"; // In production, this should be more secure

  // Initial projects from your existing portfolio
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
      features: ["High-quality audio processing", "Professional video editing", "Islamic content creation"]
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
      features: ["Advanced effects", "Smooth transition", "Inspirational content"]
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
      features: ["Caption edit", "Smooth transitions"]
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
      features: ["Advance effect", "Background effects"]
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
      features: ["Text animation", "Islamic imagery", "Spiritual content"]
    }
  ];

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('dev_authenticated', 'true');
      toast({
        title: "Access Granted",
        description: "Welcome to Developer's Space",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid password",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    // Check if already authenticated
    const isAuth = localStorage.getItem('dev_authenticated');
    if (isAuth === 'true') {
      setIsAuthenticated(true);
    }

    // Load projects from localStorage, if none exist, use initial projects
    const savedProjects = localStorage.getItem('video_projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      // Initialize with existing portfolio projects
      setProjects(initialProjects);
      localStorage.setItem('video_projects', JSON.stringify(initialProjects));
    }
  }, []);

  const saveProjects = (updatedProjects: VideoProject[]) => {
    localStorage.setItem('video_projects', JSON.stringify(updatedProjects));
    setProjects(updatedProjects);
  };

  const handleAddProject = () => {
    const newProject: VideoProject = {
      id: Date.now(),
      title: '',
      description: '',
      category: 'long',
      tools: [],
      duration: '',
      type: '',
      videoUrl: '',
      thumbnail: '',
      detailedDescription: '',
      features: [],
      status: 'planned'
    };
    setEditingProject(newProject);
    setIsEditing(true);
  };

  const handleEditProject = (project: VideoProject) => {
    setEditingProject(project);
    setIsEditing(true);
  };

  const handleDeleteProject = (projectId: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      const updatedProjects = projects.filter(p => p.id !== projectId);
      saveProjects(updatedProjects);
      toast({
        title: "Project Deleted",
        description: "Project has been removed successfully",
      });
    }
  };

  const handleSaveProject = (projectData: any) => {
    const tools = typeof projectData.tools === 'string' 
      ? projectData.tools.split(',').map((tool: string) => tool.trim()).filter(Boolean)
      : projectData.tools;
    
    const features = typeof projectData.features === 'string'
      ? projectData.features.split(',').map((feature: string) => feature.trim()).filter(Boolean)
      : projectData.features;

    const projectToSave = {
      ...projectData,
      tools,
      features
    };

    let updatedProjects;
    if (projectToSave.id && projects.find(p => p.id === projectToSave.id)) {
      // Update existing
      updatedProjects = projects.map(p => p.id === projectToSave.id ? projectToSave : p);
    } else {
      // Add new
      projectToSave.id = Date.now();
      updatedProjects = [...projects, projectToSave];
    }

    saveProjects(updatedProjects);
    setIsEditing(false);
    setEditingProject(null);
    toast({
      title: "Project Saved",
      description: "Project has been saved successfully",
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('dev_authenticated');
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Developer's Space</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button onClick={handleLogin} className="w-full">
              Access Developer Space
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/'} 
              className="w-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isEditing && editingProject) {
    return <ProjectEditor 
      project={editingProject} 
      onSave={handleSaveProject}
      onCancel={() => {
        setIsEditing(false);
        setEditingProject(null);
      }}
    />;
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Developer's Space</h1>
            <p className="text-muted-foreground">Manage your video portfolio</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAddProject}>
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                window.history.pushState({}, '', '/');
                window.location.reload();
              }}
              className="md:hidden"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Home
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="group hover:shadow-lg transition-all duration-200">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg line-clamp-2">{project.title || 'Untitled'}</CardTitle>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" onClick={() => handleEditProject(project)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDeleteProject(project.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {project.thumbnail && (
                  <img 
                    src={project.thumbnail} 
                    alt={project.title}
                    className="w-full aspect-video object-cover rounded-lg mb-3"
                  />
                )}
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {project.description || 'No description'}
                </p>
                <div className="flex justify-between items-center text-xs">
                  <span className={`px-2 py-1 rounded-full ${
                    project.category === 'long' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {project.category}
                  </span>
                  <span className="text-muted-foreground">{project.duration}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProjectEditor = ({ 
  project, 
  onSave, 
  onCancel 
}: { 
  project: VideoProject;
  onSave: (project: any) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState({
    ...project,
    tools: project.tools.join(', '),
    features: project.features.join(', ')
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            {project.id && project.title ? 'Edit Project' : 'Add New Project'}
          </h1>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value as 'long' | 'short'})}
                  className="w-full px-3 py-2 border border-input rounded-md"
                  required
                >
                  <option value="long">Long Video</option>
                  <option value="short">Short Video</option>
                </select>
              </div>

              <div>
                <Label htmlFor="type">Type *</Label>
                <Input
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  placeholder="e.g., Nasheed Video, Quote Reel"
                  required
                />
              </div>

              <div>
                <Label htmlFor="duration">Duration *</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  placeholder="e.g., 3:29 min, 25 sec"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="videoUrl">Video URL</Label>
                <Input
                  id="videoUrl"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
                  placeholder="https://youtu.be/... or https://vimeo.com/..."
                />
              </div>

              <div>
                <Label htmlFor="thumbnail">Thumbnail URL *</Label>
                <Input
                  id="thumbnail"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
                  placeholder="https://..."
                  required
                />
              </div>

              <div>
                <Label htmlFor="tools">Tools (comma-separated)</Label>
                <Input
                  id="tools"
                  value={formData.tools}
                  onChange={(e) => setFormData({...formData, tools: e.target.value})}
                  placeholder="VN Video Editor, Alight motion, Capcut"
                />
              </div>

              <div>
                <Label htmlFor="status">Status *</Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value as VideoProject['status']})}
                  className="w-full px-3 py-2 border border-input rounded-md"
                  required
                >
                  <option value="planned">Planned</option>
                  <option value="learning">Learning</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="detailedDescription">Detailed Description</Label>
            <Textarea
              id="detailedDescription"
              value={formData.detailedDescription}
              onChange={(e) => setFormData({...formData, detailedDescription: e.target.value})}
              placeholder="Detailed description for hover card"
            />
          </div>

          <div>
            <Label htmlFor="features">Features (comma-separated)</Label>
            <Textarea
              id="features"
              value={formData.features}
              onChange={(e) => setFormData({...formData, features: e.target.value})}
              placeholder="High-quality audio processing, Professional video editing, Islamic content creation"
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit">Save Project</Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeveloperSpace;