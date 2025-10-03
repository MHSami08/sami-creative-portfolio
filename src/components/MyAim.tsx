
import { Target, Users, Globe, Heart, Star, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const MyAim = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50/30 via-background to-blue-50/30 dark:from-emerald-900/10 dark:via-background dark:to-blue-900/10 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b981/05_1px,transparent_1px),linear-gradient(to_bottom,#10b981/05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-full border border-emerald-400/30 backdrop-blur-lg shadow-xl shadow-emerald-500/10">
              <Target className="w-6 h-6 text-emerald-400 animate-pulse" />
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                MY AIM
              </h2>
              <Target className="w-6 h-6 text-blue-400 animate-pulse" />
            </div>
          </div>

          {/* Main aim statement */}
          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 backdrop-blur-lg border border-emerald-400/30 shadow-2xl shadow-emerald-500/20">
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/50">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-lg sm:text-xl md:text-2xl text-foreground leading-relaxed font-medium">
                      My aim is to serve the 
                      <span className="text-emerald-400 font-bold"> Muslim Ummah </span>
                      with my work and skills. So that we can face challenges of the world and be a 
                      <span className="text-blue-400 font-bold"> developed Nation </span>
                      with 
                      <span className="text-amber-400 font-bold"> faith and technology</span>.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quranic verse related to the aim */}
            <Card className="bg-gradient-to-r from-amber-500/10 to-emerald-500/10 backdrop-blur-lg border border-amber-400/30 shadow-xl shadow-amber-500/20">
              <CardContent className="p-6 sm:p-8">
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <Star className="w-8 h-8 text-amber-400 animate-pulse" />
                  </div>
                  <p className="text-amber-400 dark:text-amber-300 font-amiri text-lg sm:text-xl md:text-2xl font-bold">
                    "وَأَعِدُّوا لَهُم مَّا اسْتَطَعْتُم مِّن قُوَّةٍ"
                  </p>
                  <p className="text-muted-foreground text-base sm:text-lg">
                    "And prepare against them whatever you are able of power"
                  </p>
                  <p className="text-sm text-muted-foreground italic">
                    - Quran 8:60
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Vision cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {[
            {
              icon: Users,
              title: "Serve the Ummah",
              description: "Using my skills to benefit the Muslim community worldwide",
              color: "from-emerald-500 to-emerald-600",
              bgColor: "from-emerald-500/10 to-emerald-600/10",
              borderColor: "border-emerald-400/30"
            },
            {
              icon: Globe,
              title: "Global Impact",
              description: "Contributing to making the Muslim world a developed force",
              color: "from-blue-500 to-blue-600",
              bgColor: "from-blue-500/10 to-blue-600/10",
              borderColor: "border-blue-400/30"
            },
            {
              icon: Lightbulb,
              title: "Faith & Technology",
              description: "Combining Islamic values with modern technological advancement",
              color: "from-amber-500 to-amber-600",
              bgColor: "from-amber-500/10 to-amber-600/10",
              borderColor: "border-amber-400/30"
            }
          ].map((item, index) => (
            <Card key={index} className={`group hover:shadow-2xl transition-all duration-500 bg-gradient-to-br ${item.bgColor} backdrop-blur-lg border ${item.borderColor} hover:scale-105 hover:rotate-1`}>
              <CardContent className="p-6 sm:p-8 text-center">
                <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Hadith section */}
        <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-lg border border-blue-400/30 shadow-xl shadow-blue-500/20">
          <CardContent className="p-6 sm:p-8">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-blue-400">Hadith</h3>
                <p className="text-foreground text-lg font-medium italic">
                  "Allah loves, when one of you does a job, that he does it with excellence (ihsan)."
                </p>
                <p className="text-sm text-muted-foreground">
                  - Prophet Muhammad (ﷺ)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default MyAim;
