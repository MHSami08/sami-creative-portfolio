import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Edit, Trash2, Eye, EyeOff, Save, X, Clock, Users, BarChart3, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useProjects } from '@/hooks/useProjects';
import { useAuth } from '@/utils/auth';
import { VideoProject } from '@/utils/projectManager';

const DeveloperSpace = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProject, setEditingProject] = useState<VideoProject | null>(null);
  const [sessionTime, setSessionTime] = useState(0);
  
  const { toast } = useToast();
  const auth = useAuth();
  const { projects, addProject, updateProject, deleteProject, longVideos, shortVideos } = useProjects();
  const isAuthenticated = auth.isAuthenticated();

  // Update session time every minute
  useEffect(() => {
    if (isAuthenticated) {
      const updateSessionTime = () => {
        setSessionTime(auth.getSessionTimeRemaining());
      };
      
      updateSessionTime();
      const interval = setInterval(updateSessionTime, 60000); // Update every minute
      
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, auth]);

  const handleLogin = () => {
    if (auth.authenticate(password)) {
      setPassword('');
      toast({
        title: "Access Granted",
        description: "Welcome to Developer's Space",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid password. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    auth.logout();
    setPassword('');
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
  };

  const handleAddProject = () => {
    const newProject: Omit<VideoProject, 'id' | 'createdAt' | 'updatedAt'> = {
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
    setEditingProject(newProject as VideoProject);
    setIsEditing(true);
  };

  const handleEditProject = (project: VideoProject) => {
    setEditingProject(project);
    setIsEditing(true);
  };

  const handleDeleteProject = (projectId: number) => {
    if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      if (deleteProject(projectId)) {
        toast({
          title: "Project Deleted",
          description: "Project has been removed from your portfolio",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete project",
          variant: "destructive",
        });
      }
    }
  };

  const handleSaveProject = (projectData: any) => {
    try {
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

      if (projectToSave.id && projects.find(p => p.id === projectToSave.id)) {
        // Update existing
        updateProject(projectToSave.id, projectToSave);
        toast({
          title: "Project Updated",
          description: "Your changes have been saved and will appear in the portfolio",
        });
      } else {
        // Add new
        addProject(projectToSave);
        toast({
          title: "Project Created",
          description: "New project has been added to your portfolio",
        });
      }

      setIsEditing(false);
      setEditingProject(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save project. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900/20 via-background to-purple-900/20 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f6/05_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6/05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        
        <Card className="w-full max-w-md relative z-10 bg-card/80 backdrop-blur-xl border-blue-400/30 shadow-2xl shadow-blue-500/10">
          <CardHeader className="text-center pb-2">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Settings className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Developer's Space
            </CardTitle>
            <p className="text-muted-foreground">Secure access required</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Admin Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  placeholder="Enter your secure password"
                  className="pr-10 bg-background/50 border-blue-400/30 focus:border-blue-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            
            <Button onClick={handleLogin} className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              Access Developer Space
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/'} 
              className="w-full border-blue-400/30 hover:bg-blue-500/10"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Button>
            
            <div className="text-center text-xs text-muted-foreground">
              <p>Secure authentication • Session-based access</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Project Editor
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

  // Main Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/10 via-background to-purple-900/10">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f6/05_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6/05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      
      <div className="relative z-10 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Developer's Space
              </h1>
              <p className="text-muted-foreground mt-1">Manage your video portfolio • {projects.length} projects</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              {/* Session Timer */}
              <div className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 rounded-lg border border-blue-400/30">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-blue-400 font-medium">{sessionTime}m left</span>
              </div>
              
              <Button onClick={handleAddProject} className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700">
                <Plus className="mr-2 h-4 w-4" />
                Add Project
              </Button>
              
              <Button variant="outline" onClick={() => window.location.href = '/'} className="border-blue-400/30">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Portfolio
              </Button>
              
              <Button variant="destructive" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-blue-400/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-400">{projects.length}</p>
                    <p className="text-xs text-muted-foreground">Total Projects</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 border-emerald-400/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-emerald-400">{longVideos.length}</p>
                    <p className="text-xs text-muted-foreground">Long Videos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border-purple-400/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-purple-400">{shortVideos.length}</p>
                    <p className="text-xs text-muted-foreground">Short Videos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-amber-500/10 to-amber-600/10 border-amber-400/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                    <Settings className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-amber-400">{projects.filter(p => p.status === 'completed').length}</p>
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Projects Management */}
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
              <TabsTrigger value="all">All Projects ({projects.length})</TabsTrigger>
              <TabsTrigger value="long">Long Videos ({longVideos.length})</TabsTrigger>
              <TabsTrigger value="short">Short Videos ({shortVideos.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <ProjectGrid projects={projects} onEdit={handleEditProject} onDelete={handleDeleteProject} />
            </TabsContent>
            
            <TabsContent value="long">
              <ProjectGrid projects={longVideos} onEdit={handleEditProject} onDelete={handleDeleteProject} />
            </TabsContent>
            
            <TabsContent value="short">
              <ProjectGrid projects={shortVideos} onEdit={handleEditProject} onDelete={handleDeleteProject} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

// Project Grid Component
const ProjectGrid = ({ 
  projects, 
  onEdit, 
  onDelete 
}: { 
  projects: VideoProject[];
  onEdit: (project: VideoProject) => void;
  onDelete: (id: number) => void;
}) => {
  if (projects.length === 0) {
    return (
      <Card className="p-12 text-center bg-card/50 border-dashed border-2 border-muted-foreground/20">
        <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
          <Plus className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
        <p className="text-muted-foreground">Create your first project to get started</p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Card key={project.id} className="group hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start gap-2">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                  {project.title || 'Untitled Project'}
                </CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant={project.category === 'long' ? 'default' : 'secondary'} className="text-xs">
                    {project.category}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      project.status === 'completed' ? 'border-emerald-400 text-emerald-400' :
                      project.status === 'learning' ? 'border-amber-400 text-amber-400' :
                      'border-blue-400 text-blue-400'
                    }`}
                  >
                    {project.status}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" onClick={() => onEdit(project)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => onDelete(project.id)} className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {project.thumbnail && project.thumbnail !== 'N/A' && (
              <div className="relative overflow-hidden rounded-lg">
                <img 
                  src={project.thumbnail} 
                  alt={project.title}
                  className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {project.videoUrl && project.videoUrl !== 'N/A' && (
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Play className="w-6 h-6 text-white ml-1" />
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.description || 'No description available'}
              </p>
              
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>{project.type || 'Unknown type'}</span>
                <span>{project.duration || 'No duration'}</span>
              </div>
              
              {project.tools.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {project.tools.slice(0, 3).map((tool, idx) => (
                    <span key={idx} className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                      {tool}
                    </span>
                  ))}
                  {project.tools.length > 3 && (
                    <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                      +{project.tools.length - 3} more
                    </span>
                  )}
                </div>
              )}
            </div>
            
            <div className="text-xs text-muted-foreground pt-2 border-t">
              Updated: {new Date(project.updatedAt).toLocaleDateString()}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Enhanced Project Editor Component
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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.type.trim()) newErrors.type = 'Type is required';
    if (!formData.duration.trim()) newErrors.duration = 'Duration is required';
    if (!formData.thumbnail.trim()) newErrors.thumbnail = 'Thumbnail URL is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/10 via-background to-purple-900/10 p-4">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f6/05_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6/05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {project.id && project.title ? 'Edit Project' : 'Create New Project'}
            </h1>
            <p className="text-muted-foreground">
              {project.id && project.title ? 'Update your project details' : 'Add a new project to your portfolio'}
            </p>
          </div>
          <Button variant="outline" onClick={onCancel} className="border-red-400/30 text-red-400 hover:bg-red-500/10">
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-sm font-medium">Project Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter project title"
                    className={`mt-1 ${errors.title ? 'border-red-500' : ''}`}
                  />
                  {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                </div>

                <div>
                  <Label htmlFor="description" className="text-sm font-medium">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Brief description of your project"
                    className={`mt-1 ${errors.description ? 'border-red-500' : ''}`}
                    rows={3}
                  />
                  {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category" className="text-sm font-medium">Category *</Label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
                    >
                      <option value="long">Long Video</option>
                      <option value="short">Short Video</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="status" className="text-sm font-medium">Status *</Label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
                    >
                      <option value="planned">Planned</option>
                      <option value="learning">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type" className="text-sm font-medium">Project Type *</Label>
                    <Input
                      id="type"
                      value={formData.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                      placeholder="e.g., Nasheed Video, Quote Reel"
                      className={`mt-1 ${errors.type ? 'border-red-500' : ''}`}
                    />
                    {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
                  </div>

                  <div>
                    <Label htmlFor="duration" className="text-sm font-medium">Duration *</Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
                      placeholder="e.g., 3:29 min, 25 sec"
                      className={`mt-1 ${errors.duration ? 'border-red-500' : ''}`}
                    />
                    {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right Column */}
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Media & Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="videoUrl" className="text-sm font-medium">Video URL</Label>
                  <Input
                    id="videoUrl"
                    value={formData.videoUrl}
                    onChange={(e) => handleInputChange('videoUrl', e.target.value)}
                    placeholder="https://youtu.be/... or https://vimeo.com/..."
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Leave empty if video is not ready</p>
                </div>

                <div>
                  <Label htmlFor="thumbnail" className="text-sm font-medium">Thumbnail URL *</Label>
                  <Input
                    id="thumbnail"
                    value={formData.thumbnail}
                    onChange={(e) => handleInputChange('thumbnail', e.target.value)}
                    placeholder="https://..."
                    className={`mt-1 ${errors.thumbnail ? 'border-red-500' : ''}`}
                  />
                  {errors.thumbnail && <p className="text-red-500 text-xs mt-1">{errors.thumbnail}</p>}
                  {formData.thumbnail && (
                    <div className="mt-2">
                      <img 
                        src={formData.thumbnail} 
                        alt="Thumbnail preview" 
                        className="w-full max-w-xs aspect-video object-cover rounded border"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="tools" className="text-sm font-medium">Tools Used</Label>
                  <Input
                    id="tools"
                    value={formData.tools}
                    onChange={(e) => handleInputChange('tools', e.target.value)}
                    placeholder="VN Video Editor, Alight Motion, Capcut"
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Separate multiple tools with commas</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Full Width Cards */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Additional Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="detailedDescription" className="text-sm font-medium">Detailed Description</Label>
                <Textarea
                  id="detailedDescription"
                  value={formData.detailedDescription}
                  onChange={(e) => handleInputChange('detailedDescription', e.target.value)}
                  placeholder="Detailed description that will appear in hover cards and project details"
                  className="mt-1"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="features" className="text-sm font-medium">Key Features</Label>
                <Textarea
                  id="features"
                  value={formData.features}
                  onChange={(e) => handleInputChange('features', e.target.value)}
                  placeholder="High-quality audio processing, Professional video editing, Islamic content creation"
                  className="mt-1"
                  rows={3}
                />
                <p className="text-xs text-muted-foreground mt-1">Separate multiple features with commas</p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end">
            <Button type="button" variant="outline" onClick={onCancel} className="border-red-400/30 text-red-400 hover:bg-red-500/10">
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 px-8">
              <Save className="mr-2 h-4 w-4" />
              Save Project
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeveloperSpace;