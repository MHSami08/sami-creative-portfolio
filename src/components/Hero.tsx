import { ArrowRight, Play, Sparkles, Code, Video, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-24 sm:pt-0">
      {/* Apple-like gradient background with smooth morphing */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-background to-purple-900/10 animate-glass-morph"></div>
      
      {/* Subtle animated grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      
      {/* Floating glass morphism elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large morphing background elements */}
        <div className="absolute top-1/4 left-1/4 w-48 sm:w-72 h-48 sm:h-72 morph-element opacity-30 animate-morph"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 morph-element opacity-20 animate-morph" style={{ animationDelay: '3s' }}></div>
        
        {/* Elegant floating glass cards */}
        <div className="hidden lg:block absolute top-1/2 left-16 float-glass p-4 rounded-2xl animate-glow-pulse" style={{ animationDelay: '1s' }}>
          <Sparkles className="w-6 h-6 text-blue-400 animate-pulse-scale" />
        </div>
        
        <div className="hidden lg:block absolute bottom-1/3 right-16 float-glass p-3 rounded-xl" style={{ animationDelay: '2s' }}>
          <Video className="w-5 h-5 text-purple-400 animate-bounce-gentle" />
        </div>
        
        {/* Smooth gradient lines */}
        <div className="hidden md:block absolute top-1/3 right-20 w-1 h-16 bg-gradient-to-b from-blue-400/30 to-transparent rounded-full animate-pulse-scale"></div> 
        <div className="hidden md:block absolute bottom-1/3 left-32 w-1 h-12 bg-gradient-to-t from-purple-400/30 to-transparent rounded-full animate-pulse-scale" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Enhanced Content */}
          <div className="text-center lg:text-left space-y-6 lg:space-y-8 animate-fade-in order-2 lg:order-1">
            {/* Islamic greeting with glass morphism */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 glass rounded-full animate-glow-pulse">
                <Sparkles className="w-5 sm:w-6 h-5 sm:h-6 text-blue-400 animate-pulse-scale" />
                <p className="text-blue-400 dark:text-blue-300 text-base sm:text-lg font-bold">Assalamu Alaikum</p>
                <Sparkles className="w-5 sm:w-6 h-5 sm:h-6 text-amber-400 animate-pulse-scale" />
              </div>
            </div>

            {/* Improved typography with better flow */}
            <div className="space-y-4 lg:space-y-6">
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                
                <span className="bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-600 bg-clip-text text-transparent animate-pulse">
                  I'm MH Sami
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                A Passionate
                <span className="text-blue-400 font-bold"> Video Editor </span>
                 creating meaningful content following 
                <span className="text-amber-400 font-bold"> Islamic principles</span>.
              </p>

              {/* Quranic verse */}
              <div className="p-6 sm:p-8 glass-card rounded-3xl animate-scale-in" style={{ animationDelay: '0.5s' }}>
                <p className="text-blue-400 dark:text-blue-300 font-amiri text-lg sm:text-xl font-medium text-center mb-3">
                  "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ مُحَمَّدٌ رَسُولُ ٱللَّٰهِ"
                </p>
                <p className="text-sm sm:text-base text-muted-foreground text-center">
                  There is no god but Allah,
                  Muhammad(Sa.) is the messenger of Allah
                </p>
              </div>
            </div>

            {/* Enhanced CTA buttons with Apple-like styling */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                onClick={() => scrollToSection('#portfolio')}
                className="group apple-button bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg rounded-2xl font-semibold shadow-2xl shadow-blue-500/30 transition-all duration-500 hover:shadow-3xl hover:shadow-purple-500/40"
              >
                <span className="relative z-10">View My Work</span>
                <ArrowRight className="ml-3 h-5 sm:h-6 w-5 sm:w-6 group-hover:translate-x-2 transition-all duration-300 relative z-10" />
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => scrollToSection('#contact')}
                className="group apple-button border-2 text-cyan-400 dark:text-cyan-300 hover:text-white px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg rounded-2xl font-semibold transition-all duration-500 shadow-lg shadow-cyan-500/20"
              >
                <Play className="mr-3 h-5 sm:h-6 w-5 sm:w-6 group-hover:scale-110 transition-all duration-300 relative z-10" />
                <span className="relative z-10">Contact Me</span>
              </Button>
            </div>

            {/* Enhanced stats with glass morphism */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-8 sm:pt-10">
              <div className="text-center glass-card p-4 sm:p-6 rounded-2xl animate-slide-in-left" style={{ animationDelay: '0.7s' }}>
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent animate-pulse-scale">1+</div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium mt-2">Years Exp.</div>
              </div>
              <div className="text-center glass-card p-4 sm:p-6 rounded-2xl animate-scale-in" style={{ animationDelay: '0.9s' }}>
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent animate-pulse-scale">1</div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium mt-2">Project</div>
              </div>
              <div className="text-center glass-card p-4 sm:p-6 rounded-2xl animate-slide-in-right" style={{ animationDelay: '1.1s' }}>
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent animate-pulse-scale">Best</div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium mt-2">Quality</div>
              </div>
            </div>
          </div>

          {/* Enhanced Profile Picture Section - Mobile responsive */}
          <div className="flex justify-center lg:justify-end animate-scale-in order-1 lg:order-2" style={{ animationDelay: '0.3s' }}>
            <div className="relative group">
              {/* Main profile container - Responsive sizing */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                {/* Morphing glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-all duration-700 animate-morph"></div>
                
                {/* Glass morphism profile container */}
                <div className="relative w-full h-full rounded-full glass-card p-2 shadow-2xl animate-glow-pulse">
                  <div className="w-full h-full rounded-full overflow-hidden border border-white/20">
                    <img 
                      src="https://i.postimg.cc/8zn3mQ1z/Screenshot-2025-06-16-22-41-45-730-com-alightcreative-motion-edit.jpg"
                      alt="Masrafi Haque Sami"
                      className="w-full h-full object-cover rounded-full transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>
                
        {/* Enhanced floating glass decorations */}
        <div className="absolute top-3 sm:top-5 right-3 sm:right-5 float-glass p-3 sm:p-4 rounded-2xl animate-bounce-gentle">
          <Sparkles className="w-5 sm:w-7 h-5 sm:h-7 text-blue-400 animate-pulse-scale" />
        </div>
        <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 float-glass p-2 sm:p-3 rounded-xl animate-bounce-gentle" style={{ animationDelay: '1s' }}>
          <Video className="w-4 sm:w-6 h-4 sm:h-6 text-purple-400 animate-pulse-scale" />
        </div>
        <div className="absolute top-10 sm:top-14 left-5 sm:left-10 float-glass p-2 sm:p-3 rounded-lg animate-bounce-gentle" style={{ animationDelay: '2s' }}>
          <Code className="w-4 sm:w-5 h-4 sm:h-5 text-amber-400 animate-bounce-gentle" />
        </div>
        <div className="absolute bottom-10 sm:bottom-14 right-5 sm:right-10 float-glass p-2 sm:p-3 rounded-lg animate-bounce-gentle" style={{ animationDelay: '1.5s' }}>
          <Target className="w-4 sm:w-5 h-4 sm:h-5 text-pink-400 animate-pulse-scale" />
        </div>
        
        {/* Subtle morphing elements */}
        <div className="absolute top-1/2 -left-1 w-3 h-3 morph-element opacity-60 animate-morph" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-3/4 -right-1 w-2 h-2 morph-element opacity-50 animate-morph" style={{ animationDelay: '4s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
