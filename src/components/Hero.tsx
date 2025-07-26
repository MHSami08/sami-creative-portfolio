import { ArrowRight, Play, Sparkles, Code, Video, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useContent } from '@/hooks/useContent';

const Hero = () => {
  const { content } = useContent();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!content) return null;

  return (
    <section className="w-full py-12 lg:py-20">
      <div className="container grid items-center gap-6 px-4 md:grid-cols-2 md:gap-10">
        
        {/* Text Content */}
        <div className="text-center space-y-6 lg:space-y-8 animate-fade-in order-2 lg:order-1">
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
            <Sparkles className="h-4 w-4 text-yellow-400" />
            Assalamu Alaikum! I’m
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-balance">
            MH Sami
          </h1>

          {/* ✅ Fixed: Centered paragraph */}
          <div className="w-full px-4">
            <p className="text-center mx-auto text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
              A passionate
              <span className="text-blue-400 font-bold"> Video Editor </span>
              creating meaningful content following
              <span className="text-amber-400 font-bold"> Islamic principles</span>.
            </p>
          </div>

          <blockquote className="text-sm sm:text-base italic text-muted-foreground">
            “Indeed, Allah loves those who do things with excellence.” – Quran 2:195
          </blockquote>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" onClick={() => scrollToSection('#projects')}>
              Explore My Work <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection('#skills')}
            >
              My Skills
            </Button>
          </div>
        </div>

        {/* Illustration Content */}
        <div className="relative w-full h-full flex items-center justify-center order-1 lg:order-2 animate-fade-in">
          <img
            src="/hero-illustration.svg"
            alt="Illustration"
            className="w-full max-w-md md:max-w-lg lg:max-w-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
