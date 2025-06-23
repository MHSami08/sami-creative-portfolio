
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden islamic-pattern">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 border-2 border-primary/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 border-2 border-accent/20 rotate-45 animate-geometric"></div>
        <div className="absolute bottom-32 left-20 w-12 h-12 bg-primary/10 rounded-lg animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-32 w-24 h-24 border border-accent/20 rounded-full animate-geometric" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <div className="mb-6">
              <p className="text-accent font-amiri text-lg mb-2">بسم الله الرحمن الرحيم</p>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                <span className="block">Assalamu Alaikum,</span>
                <span className="block">I'm <span className="gradient-text">Masrafi</span></span>
                <span className="block text-2xl md:text-3xl text-muted-foreground mt-2">
                  Haque Sami
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                A passionate learner and aspiring video editor dedicated to creating meaningful content 
                while following Islamic principles.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                onClick={() => scrollToSection('#portfolio')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all hover:scale-105"
              >
                View My Work
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                onClick={() => scrollToSection('#contact')}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all hover:scale-105"
              >
                <Play className="h-5 w-5" />
                Contact Me
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">0+</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">Learning</div>
                <div className="text-sm text-muted-foreground">Phase</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">SSC</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </div>
          </div>

          {/* Profile Picture Section */}
          <div className="flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-primary to-accent p-1">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                  <div className="w-72 h-72 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <div className="w-24 h-24 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center">
                        <span className="text-3xl font-bold text-primary">MHS</span>
                      </div>
                      <p className="text-sm">Profile Picture</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full animate-float"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 border-2 border-primary rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
