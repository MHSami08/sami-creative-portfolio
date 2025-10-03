
import { BookOpen, Heart, Award, Users, Target } from 'lucide-react';
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
      icon: Award,
      title: "Simplicity",
      description: "Finding beauty in modest and humble approaches",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: Target,
      title: "Dedication",
      description: "Committed to continuous learning and improvement",
      color: "from-blue-500 to-blue-600"
    }
  ];

  const timeline = [
    {
      year: "2025",
      title: "SSC Examination",
      description: "Successfully completed Secondary School Certificate",
      status: "completed"
    },
    {
      year: "2025",
      title: "Learning Phase",
      description: "Currently learning Video Editing",
      status: "current"
    },
    {
      year: "2026",
      title: "Future Goals",
      description: "Planning to offer Professional Editing services",
      status: "future"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50/30 via-background to-purple-50/30 dark:from-blue-900/10 dark:via-background dark:to-purple-900/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f6/05_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6/05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      <div className="absolute top-10 right-10 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          {/* Bismillah */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-amber-500/10 rounded-full border border-blue-400/30 backdrop-blur-lg shadow-lg shadow-blue-500/10">
              <BookOpen className="w-5 h-5 text-blue-400" />
              <p className="text-blue-400 dark:text-blue-300 font-amiri text-lg font-medium">بسم الله الرحمن الرحيم</p>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">About Me</span>
          </h2>
          <div className="max-w-3xl mx-auto space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed text-center">
            <p>
              I am an ordinary Muslim, passionate about <span className="text-blue-400 font-semibold">EDITING</span>.
              Though I am at the beginning of my journey, I am deeply committed to growing and sharing my creative work.
            </p>
            <p>
              My goal is to create content that is both <span className="text-amber-400 font-semibold">meaningful and halal</span>,
              contributing positively to our community while honing my technical skills.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Islamic Values */}
          <div className="space-y-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8">
              <span className="bg-gradient-to-r from-amber-400 to-blue-500 bg-clip-text text-transparent">My Values</span>
            </h3>
            <div className="space-y-6">
              {values.map((value, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-blue-400/30 bg-gradient-to-r from-blue-500/5 to-purple-500/5 backdrop-blur-lg hover:scale-105">
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
            <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8">
              <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">My Journey</span>
            </h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-purple-500 to-blue-400"></div>
              
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <div key={index} className="relative flex items-start gap-6">
                    {/* Timeline dot */}
                    <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center shadow-xl ${
                      item.status === 'completed' 
                        ? 'bg-gradient-to-r from-blue-400 to-blue-500 shadow-blue-500/50' 
                        : item.status === 'current'
                        ? 'bg-gradient-to-r from-purple-400 to-purple-500 animate-pulse shadow-purple-500/50'
                        : 'bg-gradient-to-r from-gray-400 to-gray-500'
                    }`}>
                      {item.status === 'completed' && <Award className="w-6 h-6 text-white" />}
                      {item.status === 'current' && <Users className="w-6 h-6 text-white" />}
                      {item.status === 'future' && <Target className="w-6 h-6 text-white" />}
                    </div>
                    
                    {/* Timeline content */}
                    <Card className="flex-1 bg-gradient-to-r from-blue-500/5 to-purple-500/5 backdrop-blur-lg border border-blue-400/30 hover:shadow-xl transition-all duration-300 hover:scale-105">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <span className="text-sm font-bold text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full border border-blue-400/30">
                            {item.year}
                          </span>
                          {item.status === 'current' && (
                            <span className="text-xs font-medium text-purple-400 bg-purple-400/10 px-2 py-1 rounded-full animate-pulse border border-purple-400/30">
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

        {/* Enhanced Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { label: "Learning Hours", value: "100+", color: "from-blue-400 to-blue-500", bgColor: "from-blue-500/10 to-blue-600/10" },
            { label: "Projects Planned", value: "5+", color: "from-purple-400 to-purple-500", bgColor: "from-purple-500/10 to-purple-600/10" },
            { label: "Skills Growing", value: "2", color: "from-amber-400 to-amber-500", bgColor: "from-amber-500/10 to-amber-600/10" },
            { label: "Years Ahead", value: "Many", color: "from-emerald-400 to-emerald-500", bgColor: "from-emerald-500/10 to-emerald-600/10" }
          ].map((stat, index) => (
            <Card key={index} className={`text-center bg-gradient-to-br ${stat.bgColor} backdrop-blur-lg border border-blue-400/30 hover:shadow-xl transition-all duration-300 group hover:scale-105`}>
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
