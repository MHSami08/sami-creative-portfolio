import { useRef } from 'react';
import { ArrowRight, Play, Sparkles, Code, Video, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMouseTracking } from '@/hooks/useMouseTracking';

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  
  const { getParallaxTransform } = useMouseTracking({ 
    ref: heroRef, 
    intensity: 8 
  });

  const { getTransform: getProfileTransform } = useMouseTracking({ 
    ref: profileRef, 
    intensity: 12,
    perspective: 1500 
  });

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-24 sm:pt-0"
    >
      {/* Premium 3D Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-background to-purple-900/5"></div>
      
      {/* Interactive 3D Grid Pattern */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,#000_70%,transparent_100%)]"
        style={{ transform: getParallaxTransform(0.2) }}
      ></div>
      
      {/* 3D Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated 3D background shapes */}
        <div 
          className="absolute top-1/4 left-1/4 w-48 sm:w-72 h-48 sm:h-72 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl animate-float-3d opacity-40"
          style={{ transform: getParallaxTransform(0.4) }}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl animate-float-3d opacity-30"
          style={{ animationDelay: '3s', transform: getParallaxTransform(0.6) }}
        ></div>
        
        {/* Interactive floating cards */}
        <div 
          className="hidden lg:block absolute top-1/2 left-16 card-3d p-4 rounded-2xl bg-card/50 backdrop-blur-md border border-border/30 animate-glow-pulse-3d" 
          style={{ animationDelay: '1s', transform: getParallaxTransform(0.8) }}
        >
          <Sparkles className="w-6 h-6 text-blue-400 animate-pulse-scale-3d" />
        </div>
        
        <div 
          className="hidden lg:block absolute bottom-1/3 right-16 card-3d p-3 rounded-xl bg-card/50 backdrop-blur-md border border-border/30" 
          style={{ animationDelay: '2s', transform: getParallaxTransform(1) }}
        >
          <Video className="w-5 h-5 text-purple-400 animate-bounce-3d" />
        </div>
        
        {/* 3D gradient lines */}
        <div 
          className="hidden md:block absolute top-1/3 right-20 w-1 h-16 bg-gradient-to-b from-blue-400/40 to-transparent rounded-full animate-pulse-scale-3d"
          style={{ transform: getParallaxTransform(0.3) }}
        ></div> 
        <div 
          className="hidden md:block absolute bottom-1/3 left-32 w-1 h-12 bg-gradient-to-t from-purple-400/40 to-transparent rounded-full animate-pulse-scale-3d" 
          style={{ animationDelay: '1.5s', transform: getParallaxTransform(0.5) }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Enhanced 3D Content */}
          <div 
            className="text-center lg:text-left space-y-6 lg:space-y-8 animate-fade-in order-2 lg:order-1"
            style={{ transform: getParallaxTransform(0.2) }}
          >
            {/* Islamic greeting with 3D card effect */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 card-3d bg-card/50 backdrop-blur-md border border-border/30 rounded-full animate-glow-pulse-3d">
                <Sparkles className="w-5 sm:w-6 h-5 sm:h-6 text-blue-400 animate-pulse-scale-3d" />
                <p className="text-blue-400 dark:text-blue-300 text-base sm:text-lg font-bold">Assalamu Alaikum</p>
                <Sparkles className="w-5 sm:w-6 h-5 sm:h-6 text-amber-400 animate-pulse-scale-3d" />
              </div>
            </div>

            {/* Enhanced 3D Typography */}
            <div className="space-y-4 lg:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="gradient-text-3d">
                  I'm MH Sami
                </span>
              </h1>
              
              <p 
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl"
                style={{ transform: getParallaxTransform(0.3) }}
              >
                A Passionate
                <span className="text-blue-400 font-bold animate-pulse-scale-3d"> Video Editor </span>
                 creating meaningful content following 
                <span className="text-amber-400 font-bold animate-pulse-scale-3d"> Islamic principles</span>.
              </p>

              {/* Enhanced Quranic verse */}
              <div 
                className="p-6 sm:p-8 card-3d bg-card/60 backdrop-blur-md border border-border/40 rounded-3xl animate-scale-in" 
                style={{ animationDelay: '0.5s', transform: getParallaxTransform(0.4) }}
              >
                <p className="text-blue-400 dark:text-blue-300 font-amiri text-lg sm:text-xl font-medium text-center mb-3">
                  "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ مُحَمَّدٌ رَسُولُ ٱللَّٰهِ"
                </p>
                <p className="text-sm sm:text-base text-muted-foreground text-center">
                  There is no god but Allah,
                  Muhammad(Sa.) is the messenger of Allah
                </p>
              </div>
            </div>

            {/* Premium 3D CTA buttons */}
            <div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              style={{ transform: getParallaxTransform(0.6) }}
            >
              <Button 
                onClick={() => scrollToSection('#portfolio')}
                className="group premium-button bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg rounded-2xl font-semibold shadow-2xl shadow-blue-500/30 transition-all duration-700"
              >
                <span className="relative z-10">View My Work</span>
                <ArrowRight className="ml-3 h-5 sm:h-6 w-5 sm:w-6 group-hover:translate-x-2 transition-all duration-300 relative z-10" />
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => scrollToSection('#contact')}
                className="group premium-button border-2 border-primary/50 text-primary hover:text-white px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg rounded-2xl font-semibold backdrop-blur-sm bg-background/50 transition-all duration-700"
              >
                <Play className="mr-3 h-5 sm:h-6 w-5 sm:w-6 group-hover:scale-110 transition-all duration-300 relative z-10" />
                <span className="relative z-10">Contact Me</span>
              </Button>
            </div>

            {/* Enhanced 3D stats cards */}
            <div 
              className="grid grid-cols-3 gap-4 sm:gap-6 pt-8 sm:pt-10"
              style={{ transform: getParallaxTransform(0.8) }}
            >
              <div className="text-center card-3d bg-card/60 backdrop-blur-md border border-border/30 p-4 sm:p-6 rounded-2xl animate-slide-in-left" style={{ animationDelay: '0.7s' }}>
                <div className="text-2xl sm:text-3xl font-bold gradient-text-3d animate-pulse-scale-3d">1+</div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium mt-2">Years Exp.</div>
              </div>
              <div className="text-center card-3d bg-card/60 backdrop-blur-md border border-border/30 p-4 sm:p-6 rounded-2xl animate-scale-in" style={{ animationDelay: '0.9s' }}>
                <div className="text-2xl sm:text-3xl font-bold gradient-text-3d animate-pulse-scale-3d">1</div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium mt-2">Project</div>
              </div>
              <div className="text-center card-3d bg-card/60 backdrop-blur-md border border-border/30 p-4 sm:p-6 rounded-2xl animate-slide-in-right" style={{ animationDelay: '1.1s' }}>
                <div className="text-2xl sm:text-3xl font-bold gradient-text-3d animate-pulse-scale-3d">Best</div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium mt-2">Quality</div>
              </div>
            </div>
          </div>

          {/* Enhanced 3D Profile Picture Section */}
          <div 
            ref={profileRef}
            className="flex justify-center lg:justify-end animate-scale-in order-1 lg:order-2" 
            style={{ animationDelay: '0.3s', transform: getParallaxTransform(0.4) }}
          >
            <div className="relative group">
              {/* Main profile container with 3D transform */}
              <div 
                className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
                style={{ transform: getProfileTransform() }}
              >
                {/* Enhanced 3D glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition-all duration-1000 animate-rotate-3d"></div>
                
                {/* 3D Profile container */}
                <div className="relative w-full h-full rounded-full card-3d bg-card/60 backdrop-blur-md border border-border/40 p-2 shadow-2xl animate-glow-pulse-3d">
                  <div className="w-full h-full rounded-full overflow-hidden border border-white/20">
                    <img 
                      src="https://i.postimg.cc/8zn3mQ1z/Screenshot-2025-06-16-22-41-45-730-com-alightcreative-motion-edit.jpg"
                      alt="Masrafi Haque Sami"
                      className="w-full h-full object-cover rounded-full transition-transform duration-1000 group-hover:scale-110"
                    />
                  </div>
                </div>
                
        {/* Enhanced 3D floating decorations */}
        <div className="absolute top-3 sm:top-5 right-3 sm:right-5 card-3d bg-card/50 backdrop-blur-md border border-border/30 p-3 sm:p-4 rounded-2xl animate-bounce-3d">
          <Sparkles className="w-5 sm:w-7 h-5 sm:h-7 text-blue-400 animate-pulse-scale-3d" />
        </div>
        <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 card-3d bg-card/50 backdrop-blur-md border border-border/30 p-2 sm:p-3 rounded-xl animate-bounce-3d" style={{ animationDelay: '1s' }}>
          <Video className="w-4 sm:w-6 h-4 sm:h-6 text-purple-400 animate-pulse-scale-3d" />
        </div>
        <div className="absolute top-10 sm:top-14 left-5 sm:left-10 card-3d bg-card/50 backdrop-blur-md border border-border/30 p-2 sm:p-3 rounded-lg animate-bounce-3d" style={{ animationDelay: '2s' }}>
          <Code className="w-4 sm:w-5 h-4 sm:h-5 text-amber-400 animate-bounce-3d" />
        </div>
        <div className="absolute bottom-10 sm:bottom-14 right-5 sm:right-10 card-3d bg-card/50 backdrop-blur-md border border-border/30 p-2 sm:p-3 rounded-lg animate-bounce-3d" style={{ animationDelay: '1.5s' }}>
          <Target className="w-4 sm:w-5 h-4 sm:h-5 text-pink-400 animate-pulse-scale-3d" />
        </div>
        
        {/* 3D morphing elements */}
        <div className="absolute top-1/2 -left-1 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-60 animate-rotate-3d" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-3/4 -right-1 w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-50 animate-rotate-3d" style={{ animationDelay: '4s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
