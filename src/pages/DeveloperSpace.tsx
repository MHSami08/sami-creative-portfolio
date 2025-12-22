import { useState, useEffect } from 'react';
import { ArrowLeft, Eye, EyeOff, Clock, Users, ChartBar as BarChart3, Settings, LogOut, Play, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useProjects, VideoProject } from '@/hooks/useProjects';
import { useAuth } from '@/utils/auth';
import { getHeroStats, saveHeroStats, HeroStats } from '@/utils/heroConfig';

const DeveloperSpace = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [heroStats, setHeroStats] = useState<HeroStats>(getHeroStats());
  
  const { toast } = useToast();
  const auth = useAuth();
  const { projects, loading, longVideos, shortVideos, error } = useProjects();
  const isAuthenticated = auth.isAuthenticated();

  // Auto-logout when component unmounts
  useEffect(() => {
    return () => {
      if (isAuthenticated) {
        auth.logout();
      }
    };
  }, [isAuthenticated, auth]);

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
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
    window.location.href = '/';
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900/20 via-background to-purple-900/20 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f6/10_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6/10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        
        <Card className="w-full max-w-md relative z-10 bg-card/95 backdrop-blur-xl border-2 border-primary/30 shadow-2xl shadow-primary/20">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Settings className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              Developer's Space
            </CardTitle>
            <p className="text-muted-foreground text-sm">🔒 Content Management Portal</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="password" className="text-sm font-semibold">Admin Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  placeholder="Enter your secure password"
                  className="pr-10 bg-background/50 border-primary/30 focus:border-primary h-12 text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            
            <Button 
              onClick={handleLogin} 
              className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 hover:from-blue-600 hover:via-purple-600 hover:to-cyan-600 text-white py-4 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
            >
              🚀 Access Developer Space
            </Button>
            
            <a href="/" className="w-full block">
              <Button
                variant="outline"
                className="w-full border-2 border-primary/30 hover:bg-primary/10 py-3"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Portfolio
              </Button>
            </a>
            
            <div className="text-center pt-2">
              <p className="text-xs text-muted-foreground">
                🔐 Secure Authentication • Auto-Logout on Exit
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
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
              <p className="text-muted-foreground mt-1">View your video portfolio • {projects.length} projects</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              {/* Session Timer */}
              <div className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 rounded-lg border border-blue-400/30">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-blue-400 font-medium">{sessionTime}m left</span>
              </div>
              
              <a href="/">
                <Button variant="outline" className="border-blue-400/30">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Portfolio
                </Button>
              </a>
              
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
                    <p className="text-2xl font-bold text-amber-400">{projects.filter(p => p.status === 'published').length}</p>
                    <p className="text-xs text-muted-foreground">Published</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Hero Stats Customization */}
          <Card className="mb-8 bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <CardTitle>Hero Section Stats</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="experience">Years Experience</Label>
                  <Input
                    id="experience"
                    value={heroStats.experience}
                    onChange={(e) => {
                      const newStats = { ...heroStats, experience: e.target.value };
                      setHeroStats(newStats);
                      saveHeroStats(newStats);
                      toast({
                        title: "Stats Updated",
                        description: "Experience value saved successfully",
                      });
                    }}
                    placeholder="e.g., 2+"
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projects">Projects Count</Label>
                  <Input
                    id="projects"
                    value={heroStats.projects}
                    onChange={(e) => {
                      const newStats = { ...heroStats, projects: e.target.value };
                      setHeroStats(newStats);
                      saveHeroStats(newStats);
                      toast({
                        title: "Stats Updated",
                        description: "Projects value saved successfully",
                      });
                    }}
                    placeholder="e.g., 50+"
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quality">Quality Level</Label>
                  <Input
                    id="quality"
                    value={heroStats.quality}
                    onChange={(e) => {
                      const newStats = { ...heroStats, quality: e.target.value };
                      setHeroStats(newStats);
                      saveHeroStats(newStats);
                      toast({
                        title: "Stats Updated",
                        description: "Quality value saved successfully",
                      });
                    }}
                    placeholder="e.g., 100%"
                    className="bg-background/50"
                  />
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-400/30">
                <p className="text-sm text-muted-foreground">
                  📌 Projects are now stored in the cloud database. To add or edit projects, contact the admin or use the database directly.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Projects List */}
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList className="bg-card/50 border border-border/50">
              <TabsTrigger value="all">All Projects ({projects.length})</TabsTrigger>
              <TabsTrigger value="long">Long Videos ({longVideos.length})</TabsTrigger>
              <TabsTrigger value="short">Short Videos ({shortVideos.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <ProjectList projects={projects} />
            </TabsContent>

            <TabsContent value="long" className="space-y-4">
              <ProjectList projects={longVideos} />
            </TabsContent>

            <TabsContent value="short" className="space-y-4">
              <ProjectList projects={shortVideos} />
            </TabsContent>
          </Tabs>

          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-400/30 rounded-lg">
              <p className="text-red-400">Error loading projects: {error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Project List Component
const ProjectList = ({ projects }: { projects: VideoProject[] }) => {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12 bg-card/50 rounded-lg border border-border/50">
        <p className="text-muted-foreground">No projects found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project) => (
        <Card key={project.id} className="bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300 hover:border-primary/30">
          <CardContent className="p-4">
            {/* Thumbnail */}
            {project.thumbnail && (
              <div className="relative mb-3 rounded-lg overflow-hidden">
                <img 
                  src={project.thumbnail} 
                  alt={project.title}
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge className={project.status === 'published' ? 'bg-green-500' : 'bg-blue-500'}>
                    {project.status}
                  </Badge>
                </div>
              </div>
            )}
            
            <h3 className="font-semibold text-lg mb-1 line-clamp-1">{project.title}</h3>
            
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs">
                {project.category === 'long' ? 'Long Video' : 'Short Video'}
              </Badge>
              {project.featured && (
                <Badge className="bg-amber-500/20 text-amber-400 text-xs">Featured</Badge>
              )}
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.description || 'No description available'}
              </p>
              
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>{project.category === 'long' ? 'Long Video' : 'Short Video'}</span>
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
            
            <div className="text-xs text-muted-foreground pt-2 border-t mt-2">
              Updated: {new Date(project.updatedAt).toLocaleDateString()}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DeveloperSpace;