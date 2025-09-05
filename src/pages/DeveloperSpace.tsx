import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Edit, Trash2, Eye, EyeOff, Save, X, Clock, Users, BarChart3, Settings, LogOut, Play, RotateCcw, Home, User, Briefcase, MessageCircle, Target, Navigation, Palette, Globe, FileText, Download, Upload, Menu, ExternalLink } from 'lucide-react';
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
import { useContent } from '@/hooks/useContent';
import { SiteContent } from '@/utils/contentManager';
import ContentEditor from '@/components/ContentEditor';
import SiteSettings from '@/components/SiteSettings';
import { useIsMobile } from '@/hooks/use-mobile';
import VideoPlayer from '@/components/VideoPlayer';

const DeveloperSpace = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProject, setEditingProject] = useState<VideoProject | null>(null);
  const [sessionTime, setSessionTime] = useState(0);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [editingContent, setEditingContent] = useState<any>(null);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const { toast } = useToast();
  const auth = useAuth();
  const { projects, loading, addProject, updateProject, deleteProject, longVideos, shortVideos } = useProjects();
  const { content, updateSection, resetToDefaults, exportContent, importContent } = useContent();
  const isAuthenticated = auth.isAuthenticated();
  const isMobile = useIsMobile();

  // Update session time every minute
  useEffect(() => {
    if (isAuthenticated) {
      const updateSessionTime = () => {
        setSessionTime(auth.getSessionTimeRemaining());
      };
      
      updateSessionTime();
      const interval = setInterval(updateSessionTime, 60000);
      
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
    setActiveSection('dashboard');
    setSidebarOpen(false);
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
      // Validate required fields
      if (!projectData.title?.trim()) {
        toast({
          title: "Validation Error",
          description: "Project title is required",
          variant: "destructive",
        });
        return;
      }

      if (!projectData.description?.trim()) {
        toast({
          title: "Validation Error", 
          description: "Project description is required",
          variant: "destructive",
        });
        return;
      }

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
        const updated = updateProject(projectToSave.id, projectToSave);
        if (!updated) {
          throw new Error('Failed to update project');
        }
        toast({
          title: "Project Updated",
          description: "Your changes have been saved and will appear in the portfolio",
        });
      } else {
        const created = addProject(projectToSave);
        if (!created) {
          throw new Error('Failed to create project');
        }
        toast({
          title: "Project Created",
          description: "New project has been added to your portfolio",
        });
      }

      setIsEditing(false);
      setEditingProject(null);
    } catch (error) {
      console.error('Save project error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save project. Please try again.",
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

  // Navigation Sidebar Component
  const Sidebar = () => (
    <div className={`${isMobile ? 'fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out z-50' : 'fixed left-0 top-0 h-full'} ${isMobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'} w-64 bg-background/95 backdrop-blur-xl border-r border-border/50`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-foreground">Dev Space</h2>
              <p className="text-xs text-muted-foreground">Site Manager</p>
            </div>
          </div>
          {isMobile && (
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        <nav className="space-y-2">
          {/* Dashboard */}
          <button
            onClick={() => {
              setActiveSection('dashboard');
              if (isMobile) setSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
              activeSection === 'dashboard'
                ? 'bg-blue-500/20 text-blue-400 border border-blue-400/30'
                : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Dashboard
          </button>

          {/* Content Sections */}
          <div className="py-2">
            <p className="text-xs font-medium text-muted-foreground mb-2 px-3">SITE CONTENT</p>
            
            {[
              { id: 'hero', icon: Home, label: 'Hero Section' },
              { id: 'about', icon: User, label: 'About Me' },
              { id: 'services', icon: Briefcase, label: 'Services' },
              { id: 'myAim', icon: Target, label: 'My Aim' },
              { id: 'contact', icon: MessageCircle, label: 'Contact' },
              { id: 'navigation', icon: Navigation, label: 'Navigation' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  if (isMobile) setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === item.id
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-400/30'
                    : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>

          {/* Settings */}
          <div className="py-2">
            <p className="text-xs font-medium text-muted-foreground mb-2 px-3">SETTINGS</p>
            
            <button
              onClick={() => {
                setActiveSection('site-settings');
                if (isMobile) setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeSection === 'site-settings'
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-400/30'
                  : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
              }`}
            >
              <Globe className="w-4 h-4" />
              Site Settings
            </button>
          </div>
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-6 left-6 right-6 space-y-2">
          <Button variant="outline" onClick={() => window.location.href = '/'} className="w-full border-blue-400/30">
            <ArrowLeft className="mr-2 h-4 w-4" />
            View Site
          </Button>
          <Button variant="destructive" onClick={handleLogout} className="w-full">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );

  // Main Dashboard with Navigation
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/10 via-background to-purple-900/10">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f6/05_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6/05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      
      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar />
      
      {/* Mobile Header */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 h-16 bg-background/95 backdrop-blur-xl border-b border-border/50 z-30 flex items-center px-4">
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </Button>
          <h1 className="ml-3 font-bold text-lg">Developer's Space</h1>
        </div>
      )}

      {/* Main Content */}
      <div className={`flex-1 ${isMobile ? 'pt-16' : 'ml-64'} p-4 sm:p-6`}>
        <div className="max-w-6xl mx-auto">
          {/* Render different sections based on activeSection */}
          {activeSection === 'dashboard' && (
            <>
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
            
            <Button 
              variant="outline" 
              onClick={() => {
                window.open('/', '_blank');
              }} 
              className="border-blue-400/30"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Portfolio
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => {
                if (confirm('This will reset all projects to defaults. Continue?')) {
                  const { ProjectManager } = require('@/utils/projectManager');
                  const projectManager = ProjectManager.getInstance();
                  projectManager.resetToDefaults();
                  toast({
                    title: "Projects Reset",
                    description: "All projects have been reset to defaults",
                  });
                }
              }}
              className="border-amber-400/30 text-amber-400 hover:bg-amber-500/10"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>

        {/* Projects Display */}
        {loading ? (
          <div className="grid gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-6 bg-muted rounded mb-4"></div>
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Long Form Videos */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Play className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Long Form Videos</h2>
                  <p className="text-muted-foreground">Featured documentary and narrative projects</p>
                </div>
              </div>

              {longVideos.length === 0 ? (
                <Card className="border-dashed border-2 border-blue-300 dark:border-blue-800">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Play className="w-12 h-12 text-blue-400 mb-4" />
                    <h3 className="text-lg font-semibold text-blue-400 mb-2">No Long Form Videos</h3>
                    <p className="text-muted-foreground text-center mb-4">
                      Add your first long form video project to showcase your documentary and narrative work.
                    </p>
                    <Button onClick={handleAddProject} className="bg-gradient-to-r from-blue-500 to-blue-600">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Long Form Project
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6">
                  {longVideos.map((project) => (
                    <ProjectCard 
                      key={project.id} 
                      project={project} 
                      onEdit={handleEditProject}
                      onDelete={handleDeleteProject}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Short Form Videos */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Short Form Videos</h2>
                  <p className="text-muted-foreground">Social media and quick content projects</p>
                </div>
              </div>

              {shortVideos.length === 0 ? (
                <Card className="border-dashed border-2 border-purple-300 dark:border-purple-800">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Users className="w-12 h-12 text-purple-400 mb-4" />
                    <h3 className="text-lg font-semibold text-purple-400 mb-2">No Short Form Videos</h3>
                    <p className="text-muted-foreground text-center mb-4">
                      Add your first short form video project to showcase your social media content.
                    </p>
                    <Button onClick={handleAddProject} className="bg-gradient-to-r from-purple-500 to-purple-600">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Short Form Project
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6">
                  {shortVideos.map((project) => (
                    <ProjectCard 
                      key={project.id} 
                      project={project} 
                      onEdit={handleEditProject}
                      onDelete={handleDeleteProject}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </>
    )}

    {/* Content Editing Sections */}
    {(activeSection === 'hero' || 
      activeSection === 'about' || 
      activeSection === 'services' || 
      activeSection === 'myAim' || 
      activeSection === 'contact' || 
      activeSection === 'navigation') && content && (
      <ContentEditor 
        section={activeSection as keyof SiteContent}
        content={content}
        onUpdate={updateSection}
      />
    )}

    {/* Site Settings */}
    {activeSection === 'site-settings' && content && (
      <SiteSettings 
        onExport={exportContent}
        onImport={importContent}
        onReset={resetToDefaults}
      />
    )}
        </div>
      </div>
    </div>
  );
};

// Project Card Component
const ProjectCard = ({ project, onEdit, onDelete }: { 
  project: VideoProject; 
  onEdit: (project: VideoProject) => void;
  onDelete: (id: number) => void;
}) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-xl font-semibold text-foreground group-hover:text-blue-400 transition-colors line-clamp-1">
                {project.title || 'Untitled Project'}
              </h3>
              <Badge 
                variant={project.status === 'completed' ? 'default' : 
                        project.status === 'learning' ? 'secondary' : 'outline'}
                className="shrink-0"
              >
                {project.status}
              </Badge>
            </div>
            
            <p className="text-muted-foreground mb-4 line-clamp-2">
              {project.description || 'No description provided'}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
              {project.duration && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{project.duration}</span>
                </div>
              )}
              {project.type && (
                <div className="flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  <span>{project.type}</span>
                </div>
              )}
              <Badge variant="outline" className="text-xs">
                {project.category === 'long' ? 'Long Form' : 'Short Form'}
              </Badge>
            </div>
            
            {project.tools && project.tools.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-4">
                {project.tools.slice(0, 5).map((tool, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tool}
                  </Badge>
                ))}
                {project.tools.length > 5 && (
                  <Badge variant="secondary" className="text-xs">
                    +{project.tools.length - 5} more
                  </Badge>
                )}
              </div>
            )}
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(project)}
              className="hover:bg-blue-500/10 hover:border-blue-400"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(project.id)}
              className="hover:bg-destructive/10 hover:border-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Project Editor Component
const ProjectEditor = ({ 
  project, 
  onSave, 
  onCancel 
}: { 
  project: VideoProject; 
  onSave: (project: VideoProject) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState({
    ...project,
    tools: Array.isArray(project.tools) ? project.tools.join(', ') : project.tools || '',
    features: Array.isArray(project.features) ? project.features.join(', ') : project.features || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert string fields back to arrays
    const processedData = {
      ...formData,
      tools: typeof formData.tools === 'string' 
        ? formData.tools.split(',').map((tool: string) => tool.trim()).filter(Boolean)
        : formData.tools,
      features: typeof formData.features === 'string'
        ? formData.features.split(',').map((feature: string) => feature.trim()).filter(Boolean)
        : formData.features
    };
    
    onSave(processedData as VideoProject);
  };

  const handlePlayVideo = (videoUrl: string, title: string) => {
    if (videoUrl && videoUrl !== 'N/A') {
      setCurrentVideo({ url: videoUrl, title });
      setVideoPlayerOpen(true);
    } else {
      toast({
        title: "No Video Available",
        description: "This project doesn't have a video URL set",
        variant: "destructive",
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/10 via-background to-purple-900/10 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={onCancel}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {project.id ? 'Edit Project' : 'Create New Project'}
            </h1>
            <p className="text-muted-foreground">Configure your video project details</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit className="w-5 h-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="Enter project title"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    className="w-full h-10 px-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  >
                    <option value="long">Long Form Video</option>
                    <option value="short">Short Form Video</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Short Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Brief description of the project"
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="detailedDescription">Detailed Description</Label>
                <Textarea
                  id="detailedDescription"
                  value={formData.detailedDescription}
                  onChange={(e) => handleChange('detailedDescription', e.target.value)}
                  placeholder="Detailed description including goals, challenges, solutions..."
                  rows={6}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => handleChange('duration', e.target.value)}
                    placeholder="e.g., 5:30, 2 hours"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">Project Type</Label>
                  <Input
                    id="type"
                    value={formData.type}
                    onChange={(e) => handleChange('type', e.target.value)}
                    placeholder="e.g., Documentary, Commercial"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => handleChange('status', e.target.value)}
                    className="w-full h-10 px-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="planned">Planned</option>
                    <option value="learning">Learning</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Media & Tools
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="videoUrl">Video URL</Label>
                <Input
                  id="videoUrl"
                  value={formData.videoUrl}
                  onChange={(e) => handleChange('videoUrl', e.target.value)}
                  placeholder="YouTube, Vimeo, or direct video URL"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="thumbnail">Thumbnail URL</Label>
                <Input
                  id="thumbnail"
                  value={formData.thumbnail}
                  onChange={(e) => handleChange('thumbnail', e.target.value)}
                  placeholder="Custom thumbnail URL (leave empty for auto-generated)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tools">Tools Used</Label>
                <Input
                  id="tools"
                  value={formData.tools}
                  onChange={(e) => handleChange('tools', e.target.value)}
                  placeholder="e.g., After Effects, Premiere Pro, DaVinci Resolve (separate with commas)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="features">Key Features</Label>
                <Textarea
                  id="features"
                  value={formData.features}
                  onChange={(e) => handleChange('features', e.target.value)}
                  placeholder="Key features or achievements (separate with commas)"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700">
              <Save className="mr-2 h-4 w-4" />
              {project.id ? 'Update Project' : 'Create Project'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeveloperSpace;