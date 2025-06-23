
import { ArrowRight, Play, Sparkles, Code, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-background to-amber-900/20"></div>
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f6/10_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6/10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      
      {/* Floating geometric elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-500/20 to-amber-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-amber-500/20 to-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        
        {/* Modern floating icons */}
        <div className="absolute top-20 right-20 p-4 bg-blue-500/10 backdrop-blur-sm rounded-2xl border border-blue-500/20 animate-float">
          <Video className="w-8 h-8 text-blue-500" />
        </div>
        <div className="absolute bottom-32 left-16 p-4 bg-amber-500/10 backdrop-blur-sm rounded-2xl border border-amber-500/20 animate-float" style={{ animationDelay: '1s' }}>
          <Code className="w-8 h-8 text-amber-500" />
        </div>
        <div className="absolute top-1/2 right-16 p-3 bg-primary/10 backdrop-blur-sm rounded-xl border border-primary/20 animate-float" style={{ animationDelay: '3s' }}>
          <Sparkles className="w-6 h-6 text-primary" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Enhanced Content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-in">
            {/* Islamic greeting with modern styling */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 rounded-full border border-amber-500/20 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <p className="text-amber-600 dark:text-amber-400 font-amiri text-sm font-medium">بسم الله الرحمن الرحيم</p>
              </div>
            </div>

            {/* Modern typography */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="block text-muted-foreground text-xl md:text-2xl font-normal mb-2">Assalamu Alaikum,</span>
                <span className="block">I'm</span>
                <span className="block bg-gradient-to-r from-blue-600 via-blue-500 to-amber-500 bg-clip-text text-transparent">
                  Masrafi
                </span>
                <span className="block text-3xl md:text-4xl text-foreground/80 font-medium">
                  Haque Sami
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                A passionate learner and aspiring 
                <span className="text-blue-500 font-semibold"> video editor </span>
                dedicated to creating meaningful content while following 
                <span className="text-amber-500 font-semibold"> Islamic principles</span>.
              </p>
            </div>

            {/* Modern CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                onClick={() => scrollToSection('#portfolio')}
                className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <span>View My Work</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => scrollToSection('#contact')}
                className="group border-2 border-amber-500/50 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-white px-8 py-4 text-lg rounded-xl font-semibold backdrop-blur-sm bg-background/50 transition-all duration-300 hover:scale-105"
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>Contact Me</span>
              </Button>
            </div>

            {/* Enhanced stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center p-4 rounded-2xl bg-background/30 backdrop-blur-sm border border-border/50">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">0+</div>
                <div className="text-sm text-muted-foreground font-medium">Projects</div>
              </div>
              <div className="text-center p-4 rounded-2xl bg-background/30 backdrop-blur-sm border border-border/50">
                <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">Learning</div>
                <div className="text-sm text-muted-foreground font-medium">Phase</div>
              </div>
              <div className="text-center p-4 rounded-2xl bg-background/30 backdrop-blur-sm border border-border/50">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">SSC</div>
                <div className="text-sm text-muted-foreground font-medium">Completed</div>
              </div>
            </div>
          </div>

          {/* Enhanced Profile Picture Section */}
          <div className="flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative group">
              {/* Main profile container with modern styling */}
              <div className="relative w-96 h-96">
                {/* Animated gradient border */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-amber-500 to-blue-500 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity animate-geometric"></div>
                
                {/* Profile picture container */}
                <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-blue-600 to-amber-600 p-1">
                  <div className="w-full h-full rounded-3xl bg-background flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center relative overflow-hidden">
                      {/* Subtle pattern overlay */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1)_0%,transparent_50%)] opacity-50"></div>
                      
                      <div className="text-center text-muted-foreground z-10">
                        <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-blue-500/20 to-amber-500/20 mx-auto mb-6 flex items-center justify-center backdrop-blur-sm border border-white/20">
                          <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-amber-600 bg-clip-text text-transparent">MHS</span>
                        </div>
                        <p className="text-sm font-medium">Profile Picture</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Modern floating decorations */}
                <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-amber-500 to-amber-400 rounded-2xl flex items-center justify-center animate-float shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-6 -left-6 w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-400 rounded-xl flex items-center justify-center animate-float shadow-lg" style={{ animationDelay: '1s' }}>
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
