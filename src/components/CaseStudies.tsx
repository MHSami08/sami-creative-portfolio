import { motion } from 'framer-motion';
import { ArrowRight, Clock, Users, Star, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface CaseStudiesProps {
  language: 'en' | 'bn';
}

const CaseStudies = ({ language }: CaseStudiesProps) => {
  const content = {
    en: {
      title: "Case Studies",
      subtitle: "Behind the scenes of our best work",
      viewProject: "View Project",
      challenge: "Challenge",
      solution: "Solution",
      result: "Result",
      testimonial: "Client Testimonial"
    },
    bn: {
      title: "কেস স্টাডি",
      subtitle: "আমাদের সেরা কাজের পেছনের গল্প",
      viewProject: "প্রকল্প দেখুন",
      challenge: "চ্যালেঞ্জ",
      solution: "সমাধান",
      result: "ফলাফল",
      testimonial: "ক্লায়েন্ট পর্যালোচনা"
    }
  };

  const text = content[language];

  const caseStudies = [
    {
      id: 1,
      title: "Islamic Educational Series",
      category: "Educational Content",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      challenge: "Create engaging educational content that maintains Islamic values while appealing to young audiences.",
      solution: "Developed a visual storytelling approach using modern editing techniques with traditional Islamic motifs.",
      result: "50% increase in viewer engagement and positive feedback from Islamic educational institutions.",
      testimonial: "MH Sami brought our vision to life with creativity and respect for our values.",
      client: "Islamic Learning Center",
      duration: "3 months",
      tools: ["After Effects", "Premiere Pro", "Audition"],
      metrics: {
        views: "100K+",
        engagement: "85%",
        satisfaction: "4.9/5"
      }
    },
    {
      id: 2,
      title: "Community Charity Campaign",
      category: "Social Impact",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      challenge: "Create compelling content to raise awareness for a local charity initiative.",
      solution: "Used emotional storytelling with real community testimonials and impactful visuals.",
      result: "Campaign exceeded fundraising goals by 200% within the first month.",
      testimonial: "The video touched hearts and inspired our community to give generously.",
      client: "Local Mosque Community",
      duration: "2 weeks",
      tools: ["DaVinci Resolve", "Canva", "Audacity"],
      metrics: {
        donations: "$50K+",
        reach: "250K",
        shares: "5K+"
      }
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900/20 to-background" id="case-studies">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Case Studies */}
        <div className="space-y-20">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              className="grid lg:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              {/* Project Visual */}
              <div className={`order-2 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                <Card className="group relative overflow-hidden bg-gray-900/50 border-gray-700/50 hover:border-emerald-400/50 transition-all duration-500">
                  <div className="relative aspect-video">
                    <img
                      src={study.thumbnail}
                      alt={study.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <Button className="w-16 h-16 bg-white/20 rounded-full backdrop-blur-lg border border-white/30 hover:bg-white/30 transition-all duration-300">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </Button>
                    </div>

                    {/* Category Tag */}
                    <div className="absolute top-4 left-4 bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-lg border border-emerald-400/30">
                      {study.category}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="p-6 bg-gray-900/30 backdrop-blur-lg">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      {Object.entries(study.metrics).map(([key, value]) => (
                        <div key={key}>
                          <div className="text-2xl font-bold text-emerald-400">{value}</div>
                          <div className="text-sm text-gray-400 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>

              {/* Project Details */}
              <div className={`order-1 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'} space-y-6`}>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">{study.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {study.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {study.client}
                    </div>
                  </div>
                </div>

                {/* Challenge, Solution, Result */}
                <div className="space-y-4">
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <h4 className="font-semibold text-red-400 mb-2">{text.challenge}</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{study.challenge}</p>
                  </div>
                  
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-400 mb-2">{text.solution}</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{study.solution}</p>
                  </div>
                  
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <h4 className="font-semibold text-green-400 mb-2">{text.result}</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{study.result}</p>
                  </div>
                </div>

                {/* Tools Used */}
                <div>
                  <h4 className="font-semibold text-gray-300 mb-3">Tools Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {study.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/30"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6 backdrop-blur-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <h4 className="font-semibold text-yellow-400">{text.testimonial}</h4>
                  </div>
                  <blockquote className="text-gray-300 italic leading-relaxed mb-3">
                    "{study.testimonial}"
                  </blockquote>
                  <cite className="text-sm text-gray-400">— {study.client}</cite>
                </div>

                {/* CTA */}
                <Button className="group bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105">
                  {text.viewProject}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;