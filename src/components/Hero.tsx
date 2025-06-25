
import { ArrowRight, Play, Sparkles, Code, Video, Target, Users, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced gradient background with green accents */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-background to-blue-900/20"></div>
      
      {/* Animated grid pattern with green accents */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b981/10_1px,transparent_1px),linear-gradient(to_bottom,#10b981/10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      
      {/* Floating geometric elements with green theme */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        
        {/* Cyber-style floating elements */}
        <div className="absolute top-20 right-20 p-4 bg-emerald-500/20 backdrop-blur-lg rounded-2xl border border-emerald-400/30 animate-float shadow-lg shadow-emerald-500/20">
          <Video className="w-8 h-8 text-emerald-400" />
        </div>
        <div className="absolute bottom-32 left-16 p-4 bg-blue-500/20 backdrop-blur-lg rounded-2xl border border-blue-400/30 animate-float shadow-lg shadow-blue-500/20" style={{ animationDelay: '1s' }}>
          <Code className="w-8 h-8 text-blue-400" />
        </div>
        <div className="absolute top-1/2 right-16 p-3 bg-amber-500/20 backdrop-blur-lg rounded-xl border border-amber-400/30 animate-float shadow-lg shadow-amber-500/20" style={{ animationDelay: '3s' }}>
          <Sparkles className="w-6 h-6 text-amber-400" />
        </div>
        
        {/* Additional cyber elements */}
        <div className="absolute top-1/3 left-20 w-2 h-16 bg-gradient-to-b from-emerald-400/50 to-transparent rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 right-32 w-2 h-12 bg-gradient-to-t from-blue-400/50 to-transparent rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Enhanced Content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-in">
            {/* Islamic greeting with cyber styling */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500/10 to-amber-500/10 rounded-full border border-emerald-400/30 backdrop-blur-lg shadow-lg shadow-emerald-500/10">
                <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
                <p className="text-emerald-400 dark:text-emerald-300 font-amiri text-lg font-bold">بسم الله الرحمن الرحيم</p>
                <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
              </div>
            </div>

            {/* Improved typography with better flow */}
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-emerald-400 dark:text-emerald-300 text-xl md:text-2xl font-amiri font-medium">السلام عليكم</p>
                <p className="text-muted-foreground text-lg md:text-xl">Assalamu Alaikum, I'm</p>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="block bg-gradient-to-r from-emerald-400 via-blue-500 to-emerald-600 bg-clip-text text-transparent animate-pulse">
                  Masrafi Haque
                </span>
                <span className="block text-4xl md:text-5xl bg-gradient-to-r from-blue-400 to-emerald-500 bg-clip-text text-transparent font-medium mt-2">
                  Sami
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                A passionate Muslim learner and aspiring 
                <span className="text-emerald-400 font-bold"> video editor </span>
                dedicated to creating meaningful content following 
                <span className="text-amber-400 font-bold"> Islamic principles</span>.
              </p>

              {/* Quranic verse */}
              <div className="p-6 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-2xl border border-emerald-400/20 backdrop-blur-lg">
                <p className="text-emerald-400 dark:text-emerald-300 font-amiri text-lg font-medium text-center mb-2">
                  "وَمَنْ أَحْيَاهَا فَكَأَنَّمَا أَحْيَا النَّاسَ جَمِيعًا"
                </p>
                <p className="text-sm text-muted-foreground text-center">
                  "And whoever saves a life, it is as if he has saved all of mankind" - Quran 5:32
                </p>
              </div>
            </div>

            {/* Enhanced CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                onClick={() => scrollToSection('#portfolio')}
                className="group bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-4 text-lg rounded-xl font-semibold shadow-xl shadow-emerald-500/25 hover:shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-105 border border-emerald-400/30"
              >
                <span>View My Work</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => scrollToSection('#contact')}
                className="group border-2 border-blue-400/50 text-blue-400 dark:text-blue-300 hover:bg-blue-500 hover:text-white px-8 py-4 text-lg rounded-xl font-semibold backdrop-blur-lg bg-background/20 transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/20"
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>Contact Me</span>
              </Button>
            </div>

            {/* Enhanced stats with cyber styling */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 backdrop-blur-lg border border-emerald-400/30 shadow-lg shadow-emerald-500/10">
                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">0+</div>
                <div className="text-sm text-muted-foreground font-medium">Projects</div>
              </div>
              <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur-lg border border-blue-400/30 shadow-lg shadow-blue-500/10">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">Learning</div>
                <div className="text-sm text-muted-foreground font-medium">Phase</div>
              </div>
              <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-600/10 backdrop-blur-lg border border-amber-400/30 shadow-lg shadow-amber-500/10">
                <div className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">SSC</div>
                <div className="text-sm text-muted-foreground font-medium">2025</div>
              </div>
            </div>
          </div>

          {/* Enhanced Profile Picture Section with closer floating elements */}
          <div className="flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative group">
              {/* Main profile container with green theme */}
              <div className="relative w-96 h-96">
                {/* Animated green gradient border */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>
                
                {/* Profile picture container */}
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-emerald-500 to-green-600 p-1 shadow-2xl shadow-emerald-500/50">
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden border-2 border-emerald-400/30">
                    <img 
                      src="https://i.postimg.cc/1zHtBmkx/Screenshot-2025-06-16-22-41-45-730-com-alightcreative-motion-edit.jpg"
                      alt="Masrafi Haque Sami"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
                
                {/* Closer floating decorations with cyber theme */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-2xl flex items-center justify-center animate-float shadow-xl shadow-emerald-500/50 border border-emerald-300/50">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl flex items-center justify-center animate-float shadow-xl shadow-blue-500/50 border border-blue-300/50" style={{ animationDelay: '1s' }}>
                  <Video className="w-5 h-5 text-white" />
                </div>
                <div className="absolute top-8 -right-8 w-8 h-8 bg-gradient-to-r from-amber-400 to-amber-500 rounded-lg flex items-center justify-center animate-float shadow-lg shadow-amber-500/50" style={{ animationDelay: '2s' }}>
                  <Code className="w-4 h-4 text-white" />
                </div>
                <div className="absolute bottom-8 -left-8 w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-500 rounded-lg flex items-center justify-center animate-float shadow-lg shadow-purple-500/50" style={{ animationDelay: '1.5s' }}>
                  <Target className="w-4 h-4 text-white" />
                </div>
                
                {/* Cyber ring effect */}
                <div className="absolute inset-0 rounded-full border-2 border-emerald-400/30 animate-ping"></div>
                <div className="absolute inset-4 rounded-full border border-green-400/20 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
