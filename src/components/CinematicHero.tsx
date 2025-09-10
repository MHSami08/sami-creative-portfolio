import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CinematicHeroProps {
  language: 'en' | 'bn';
}

const CinematicHero = ({ language }: CinematicHeroProps) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const content = {
    en: {
      greeting: "Assalamu Alaikum",
      title: "MH Sami",
      subtitle: "Video Editor & Content Creator",
      description: "A passionate video editor creating meaningful content following Islamic principles",
      watchShowreel: "Watch Showreel",
      hireMe: "Hire Me",
      yearsExp: "Years Exp.",
      projects: "Projects",
      quality: "Quality"
    },
    bn: {
      greeting: "আস্সালামু আলাইকুম",
      title: "এমএইচ সামি",
      subtitle: "ভিডিও এডিটর ও কন্টেন্ট ক্রিয়েটর",
      description: "ইসলামিক নীতি অনুসরণ করে অর্থবহ কন্টেন্ট তৈরিকারী একজন আবেগপ্রবণ ভিডিও এডিটর",
      watchShowreel: "শোরিল দেখুন",
      hireMe: "আমাকে নিয়োগ করুন",
      yearsExp: "বছরের অভিজ্ঞতা",
      projects: "প্রকল্প",
      quality: "মান"
    }
  };

  const text = content[language];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cinematic Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-30"
          onLoadedData={() => setIsVideoLoaded(true)}
        >
          <source src="/placeholder-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80" />
      </div>

      {/* Cinematic Grain Effect */}
      <div className="absolute inset-0 opacity-20 mix-blend-soft-light">
        <div className="w-full h-full bg-gradient-to-br from-gray-900/10 via-transparent to-gray-900/10 animate-pulse"></div>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="space-y-8" variants={itemVariants}>
          {/* Greeting */}
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full border border-emerald-400/30 backdrop-blur-lg"
            variants={itemVariants}
          >
            <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-medium text-lg">{text.greeting}</span>
            <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
          </motion.div>

          {/* Main Title */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-white block mb-2 text-center">{text.title}</span>
              <span className="bg-gradient-to-r from-emerald-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                {text.subtitle}
              </span>
            </h1>
            
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed text-center"
              variants={itemVariants}
            >
              {text.description}
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            variants={itemVariants}
          >
            <Button
              onClick={() => scrollToSection('#portfolio')}
              className="group relative bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white px-8 py-4 text-lg rounded-xl font-semibold shadow-2xl hover:shadow-emerald-500/50 transition-all duration-500 hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Play className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
              <span>{text.watchShowreel}</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={() => scrollToSection('#contact')}
              className="group border-2 border-white/30 text-white hover:bg-white hover:text-black px-8 py-4 text-lg rounded-xl font-semibold backdrop-blur-lg bg-white/10 transition-all duration-500 hover:scale-105"
            >
              <span>{text.hireMe}</span>
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-3 gap-4 sm:gap-8 max-w-md mx-auto pt-8 sm:pt-12"
            variants={itemVariants}
          >
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                1+
              </div>
              <div className="text-gray-400 text-xs sm:text-sm font-medium">{text.yearsExp}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                20+
              </div>
              <div className="text-gray-400 text-xs sm:text-sm font-medium">{text.projects}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-500 bg-clip-text text-transparent">
                Best
              </div>
              <div className="text-gray-400 text-xs sm:text-sm font-medium">{text.quality}</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-2 sm:h-3 bg-white rounded-full mt-1 sm:mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CinematicHero;