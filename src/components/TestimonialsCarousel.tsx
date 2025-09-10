import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TestimonialsCarouselProps {
  language: 'en' | 'bn';
}

const TestimonialsCarousel = ({ language }: TestimonialsCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedVideoTestimonial, setSelectedVideoTestimonial] = useState<string | null>(null);

  const content = {
    en: {
      title: "What Clients Say",
      subtitle: "Real feedback from satisfied clients",
      watchVideo: "Watch Video"
    },
    bn: {
      title: "ক্লায়েন্টদের মতামত",
      subtitle: "সন্তুষ্ট ক্লায়েন্টদের প্রকৃত মতামত",
      watchVideo: "ভিডিও দেখুন"
    }
  };

  const text = content[language];

  const testimonials = [
    {
      id: 1,
      type: "text",
      name: "Ahmed Hassan",
      role: "Islamic Content Creator",
      company: "Dawah Network",
      content: "MH Sami's work exceeded our expectations. His understanding of Islamic values while maintaining professional video quality is remarkable. The editing brought our message to life beautifully.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
      id: 2,
      type: "video",
      name: "Fatima Al-Zahra",
      role: "Community Manager",
      company: "Local Mosque",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      thumbnail: "https://i.pravatar.cc/150?img=2",
      content: "Working with Sami was incredible...",
      rating: 5
    },
    {
      id: 3,
      type: "text",
      name: "Omar Abdullah",
      role: "Educational Director",
      company: "Islamic Academy",
      content: "The quality of work and attention to Islamic principles made our educational content truly impactful. Students are more engaged than ever before.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    {
      id: 4,
      type: "text",
      name: "Aisha Rahman",
      role: "Nonprofit Coordinator",
      company: "Helping Hands Charity",
      content: "Sami's video editing helped us raise 300% more funds for our charity campaign. His work speaks to the heart and inspires action.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=4"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-gray-900/20" id="testimonials">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              {text.title}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {text.subtitle}
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative">
          <div className="bg-gray-900/30 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-8 sm:p-12 min-h-[400px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                {currentTestimonial.type === "text" ? (
                  // Text Testimonial
                  <div className="text-center space-y-6">
                    <Quote className="w-12 h-12 text-emerald-400 mx-auto opacity-50" />
                    
                    <blockquote className="text-xl sm:text-2xl text-gray-200 leading-relaxed max-w-4xl mx-auto font-light italic">
                      "{currentTestimonial.content}"
                    </blockquote>

                    {/* Rating */}
                    <div className="flex justify-center gap-1">
                      {[...Array(currentTestimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>

                    {/* Client Info */}
                    <div className="flex items-center justify-center gap-4">
                      <img
                        src={currentTestimonial.avatar}
                        alt={currentTestimonial.name}
                        className="w-16 h-16 rounded-full border-2 border-emerald-400/50"
                      />
                      <div className="text-left">
                        <h4 className="text-lg font-semibold text-white">{currentTestimonial.name}</h4>
                        <p className="text-emerald-400 font-medium">{currentTestimonial.role}</p>
                        <p className="text-gray-400 text-sm">{currentTestimonial.company}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Video Testimonial
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                      <Quote className="w-10 h-10 text-emerald-400 opacity-50" />
                      
                      <div className="space-y-4">
                        <div className="flex gap-1">
                          {[...Array(currentTestimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        
                        <blockquote className="text-lg text-gray-200 leading-relaxed italic">
                          "{currentTestimonial.content}"
                        </blockquote>

                        <div className="flex items-center gap-3">
                          <img
                            src={currentTestimonial.thumbnail}
                            alt={currentTestimonial.name}
                            className="w-12 h-12 rounded-full border-2 border-emerald-400/50"
                          />
                          <div>
                            <h4 className="font-semibold text-white">{currentTestimonial.name}</h4>
                            <p className="text-emerald-400 text-sm">{currentTestimonial.role}</p>
                            <p className="text-gray-400 text-xs">{currentTestimonial.company}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="relative group">
                      <div className="aspect-video bg-gray-800 rounded-xl overflow-hidden border border-gray-600/50">
                        <img
                          src={`https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg`}
                          alt="Video testimonial"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-colors duration-300">
                          <Button
                            onClick={() => setSelectedVideoTestimonial(currentTestimonial.videoUrl!)}
                            className="w-16 h-16 bg-white/20 rounded-full backdrop-blur-lg border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-110"
                          >
                            <Play className="w-8 h-8 text-white ml-1" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-center mt-3 text-emerald-400 font-medium">{text.watchVideo}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              onClick={prevTestimonial}
              variant="outline"
              size="icon"
              className="w-12 h-12 rounded-full border-emerald-400/30 text-emerald-400 hover:bg-emerald-500/10 transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? "bg-emerald-400 w-8" 
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={nextTestimonial}
              variant="outline"
              size="icon"
              className="w-12 h-12 rounded-full border-emerald-400/30 text-emerald-400 hover:bg-emerald-500/10 transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Video Modal would go here - using existing VideoPlayer component */}
        {selectedVideoTestimonial && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-background rounded-xl p-6 max-w-4xl w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Video Testimonial</h3>
                <Button
                  onClick={() => setSelectedVideoTestimonial(null)}
                  variant="ghost"
                  size="icon"
                >
                  ×
                </Button>
              </div>
              <div className="aspect-video bg-gray-900 rounded-lg">
                {/* Video player implementation would go here */}
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Video Player Component
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsCarousel;