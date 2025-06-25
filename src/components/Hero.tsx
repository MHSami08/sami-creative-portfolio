
import { ArrowRight, Play, Sparkles, Code, Video, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-24 sm:pt-0">
      {/* Enhanced gradient background with cyber theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-background to-cyan-900/20"></div>
      
      {/* Animated grid pattern with cyber accents */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f6/10_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6/10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      
      {/* Floating geometric elements with cyber theme */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 sm:w-72 h-48 sm:h-72 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        
        {/* Cyber-style floating elements - Hidden on small screens */}
        
         <div className="hidden lg:block absolute top-1/2 left-16 p-3 bg-amber-500/20 backdrop-blur-lg rounded-xl border border-amber-400/30 animate-float shadow-lg shadow-amber-500/20" style={{ animationDelay: '3s' }}>
          <Sparkles className="w-6 h-6 text-amber-400" />
        </div>
        
        {/* Additional cyber elements - Responsive */}
          <div className="hidden md:block absolute top-1/3 right-20 w-2 h-16 bg-gradient-to-b from-blue-400/50 to-transparent rounded-full animate-pulse"></div> 
        <div className="hidden md:block absolute bottom-1/3 left-32 w-2 h-12 bg-gradient-to-t from-cyan-400/50 to-transparent rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Enhanced Content */}
          <div className="text-center lg:text-left space-y-6 lg:space-y-8 animate-fade-in order-2 lg:order-1">
            {/* Islamic greeting with cyber styling */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500/10 to-amber-500/10 rounded-full border border-blue-400/30 backdrop-blur-lg shadow-lg shadow-blue-500/10">
                <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-blue-400 animate-pulse" />
                <p className="text-blue-400 dark:text-blue-300 font-amiri text-base sm:text-lg font-bold">بسم الله الرحمن الرحيم</p>
                <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-amber-400 animate-pulse" />
              </div>
            </div>

            {/* Improved typography with better flow */}
            <div className="space-y-4 lg:space-y-6">
              <div className="space-y-2">
                <p className="text-blue-400 dark:text-blue-300 text-lg sm:text-xl md:text-2xl font-amiri font-medium">السلام عليكم</p>
                <p className="text-muted-foreground text-base sm:text-lg md:text-xl">Assalamu Alaikum, I'm</p>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-600 bg-clip-text text-transparent animate-pulse">
                  Masrafi Haque Sami
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                A passionate Muslim and aspiring 
                <span className="text-blue-400 font-bold"> video editor </span>
                dedicated to creating meaningful content following 
                <span className="text-amber-400 font-bold"> Islamic principles</span>.
              </p>

              {/* Quranic verse */}
              <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl border border-blue-400/20 backdrop-blur-lg">
                <p className="text-blue-400 dark:text-blue-300 font-amiri text-base sm:text-lg font-medium text-center mb-2">
                  "وَمَنْ أَحْيَاهَا فَكَأَنَّمَا أَحْيَا النَّاسَ جَمِيعًا"
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground text-center">
                  "And whoever saves a life, it is as if he has saved all of mankind" - Quran 5:32
                </p>
              </div>
            </div>

            {/* Enhanced CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                onClick={() => scrollToSection('#portfolio')}
                className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl font-semibold shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 border border-blue-400/30"
              >
                <span>View My Work</span>
                <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => scrollToSection('#contact')}
                className="group border-2 border-cyan-400/50 text-cyan-400 dark:text-cyan-300 hover:bg-cyan-500 hover:text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl font-semibold backdrop-blur-lg bg-background/20 transition-all duration-300 hover:scale-105 shadow-lg shadow-cyan-500/20"
              >
                <Play className="mr-2 h-4 sm:h-5 w-4 sm:w-5 group-hover:scale-110 transition-transform" />
                <span>Contact Me</span>
              </Button>
            </div>

            {/* Enhanced stats with cyber styling */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 sm:pt-8">
              <div className="text-center p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur-lg border border-blue-400/30 shadow-lg shadow-blue-500/10">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">0+</div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium">Projects</div>
              </div>
              <div className="text-center p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 backdrop-blur-lg border border-cyan-400/30 shadow-lg shadow-cyan-500/10">
                <div className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-500 bg-clip-text text-transparent">Learning</div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium">Phase</div>
              </div>
              <div className="text-center p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-600/10 backdrop-blur-lg border border-amber-400/30 shadow-lg shadow-amber-500/10">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">SSC</div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium">2025</div>
              </div>
            </div>
          </div>

          {/* Enhanced Profile Picture Section - Mobile responsive */}
          <div className="flex justify-center lg:justify-end animate-fade-in order-1 lg:order-2" style={{ animationDelay: '0.2s' }}>
            <div className="relative group">
              {/* Main profile container - Responsive sizing */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                {/* Green glow for profile picture border */}
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
                
                {/* Closer floating decorations - Responsive sizing */}
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-8 sm:w-12 h-8 sm:h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl sm:rounded-2xl flex items-center justify-center animate-float shadow-xl shadow-blue-500/50 border border-blue-300/50">
                  <Sparkles className="w-4 sm:w-6 h-4 sm:h-6 text-white" />
                </div>
                <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 w-6 sm:w-10 h-6 sm:h-10 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-lg sm:rounded-xl flex items-center justify-center animate-float shadow-xl shadow-cyan-500/50 border border-cyan-300/50" style={{ animationDelay: '1s' }}>
                  <Video className="w-3 sm:w-5 h-3 sm:h-5 text-white" />
                </div>
                <div className="absolute top-8 sm:top-12 left-4 sm:left-8 w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-r from-amber-400 to-amber-500 rounded-md sm:rounded-lg flex items-center justify-center animate-float shadow-lg shadow-amber-500/50" style={{ animationDelay: '2s' }}>
                  <Code className="w-3 sm:w-4 h-3 sm:h-4 text-white" />
                </div>
                <div className="absolute bottom-8 sm:bottom-12 right-4 sm:right-8 w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-md sm:rounded-lg flex items-center justify-center animate-float shadow-lg shadow-blue-500/50" style={{ animationDelay: '1.5s' }}>
                  <Target className="w-3 sm:w-4 h-3 sm:h-4 text-white" />
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
