
import { BookOpen, Heart, Star, Award, Users, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Sincerity (Ikhlas)",
      description: "Everything I do is for the sake of Allah",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Star,
      title: "Simplicity",
      description: "Finding beauty in modest and humble approaches",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: Target,
      title: "Dedication",
      description: "Committed to continuous learning and improvement",
      color: "from-blue-500 to-indigo-500"
    }
  ];

  const timeline = [
    {
      year: "2024",
      title: "SSC Examination",
      description: "Successfully completed Secondary School Certificate",
      status: "completed"
    },
    {
      year: "2024",
      title: "Learning Phase",
      description: "Currently learning video editing and C programming",
      status: "current"
    },
    {
      year: "2025",
      title: "Future Goals",
      description: "Planning to offer professional editing services",
      status: "future"
    }
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-amber-50/50 dark:from-blue-900/10 dark:to-amber-900/10"></div>
      <div className="absolute top-10 right-10 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          {/* Bismillah */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500/10 rounded-full border border-amber-500/20 backdrop-blur-sm">
              <BookOpen className="w-5 h-5 text-amber-500" />
              <p className="text-amber-600 dark:text-amber-400 font-amiri text-lg font-medium">بسم الله الرحمن الرحيم</p>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">About Me</span>
          </h2>
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              I am a simple Muslim, passionate about <span className="text-blue-500 font-semibold">editing and programming</span>. 
              Though I am at the beginning of my journey, I am deeply committed to growing and sharing my creative work.
            </p>
            <p>
              My goal is to create content that is both <span className="text-amber-500 font-semibold">meaningful and halal</span>, 
              contributing positively to our community while honing my technical skills.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Islamic Values */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-center lg:text-left mb-8">
              <span className="bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">My Values</span>
            </h3>
            <div className="space-y-6">
              {values.map((value, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 bg-background/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${value.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <value.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-foreground mb-2">{value.title}</h4>
                        <p className="text-muted-foreground">{value.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-center lg:text-left mb-8">
              <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">My Journey</span>
            </h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-amber-500 to-blue-500"></div>
              
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <div key={index} className="relative flex items-start gap-6">
                    {/* Timeline dot */}
                    <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center shadow-lg ${
                      item.status === 'completed' 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                        : item.status === 'current'
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 animate-pulse'
                        : 'bg-gradient-to-r from-gray-400 to-gray-500'
                    }`}>
                      {item.status === 'completed' && <Award className="w-6 h-6 text-white" />}
                      {item.status === 'current' && <Users className="w-6 h-6 text-white" />}
                      {item.status === 'future' && <Target className="w-6 h-6 text-white" />}
                    </div>
                    
                    {/* Timeline content */}
                    <Card className="flex-1 bg-background/70 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                            {item.year}
                          </span>
                          {item.status === 'current' && (
                            <span className="text-xs font-medium text-amber-600 bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded-full animate-pulse">
                              Current
                            </span>
                          )}
                        </div>
                        <h4 className="text-lg font-semibold text-foreground mb-2">{item.title}</h4>
                        <p className="text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Learning Hours", value: "100+", color: "from-blue-500 to-blue-400" },
            { label: "Projects Planned", value: "5+", color: "from-amber-500 to-amber-400" },
            { label: "Skills Growing", value: "2", color: "from-purple-500 to-purple-400" },
            { label: "Years Ahead", value: "Many", color: "from-green-500 to-green-400" }
          ].map((stat, index) => (
            <Card key={index} className="text-center bg-background/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6">
                <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
