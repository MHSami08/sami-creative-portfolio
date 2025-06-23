
import { BookOpen, Heart, Code, Video } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Sincerity (Ikhlas)",
      description: "Approaching every project with pure intention and dedication"
    },
    {
      icon: BookOpen,
      title: "Continuous Learning",
      description: "Always seeking knowledge and improvement in my craft"
    },
    {
      icon: Code,
      title: "Dedication",
      description: "Committed to excellence in video editing and programming"
    }
  ];

  return (
    <section className="py-20 bg-card geometric-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-accent font-amiri text-lg mb-2">بسم الله الرحمن الرحيم</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I am a simple Muslim, passionate about editing and programming. Though I am at the beginning 
            of my journey, I am deeply committed to growing and sharing my creative work.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Bio Section */}
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold mb-6 text-primary">My Journey</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                As a passionate learner in the field of video editing and C programming, I believe in 
                the power of creativity combined with Islamic values. My journey began with a simple 
                desire to create meaningful content that reflects both technical excellence and 
                spiritual purpose.
              </p>
              <p>
                Having completed my SSC examination, I'm now focused on developing my skills in 
                video editing while exploring the fundamentals of C programming. Every project I 
                undertake is approached with sincerity and the intention to serve my community 
                through quality work.
              </p>
              <p>
                Though I'm still in the learning phase, I'm excited about the journey ahead and 
                the opportunity to share my work with others. In shaa Allah, I will continue to 
                grow and contribute positively to the creative community.
              </p>
            </div>

            {/* Education */}
            <div className="mt-8 p-6 bg-background rounded-lg border border-border">
              <h4 className="font-semibold text-primary mb-2">Education</h4>
              <p className="text-muted-foreground">Completed SSC Examination</p>
            </div>
          </div>

          {/* Islamic Values Timeline */}
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-2xl font-bold mb-6 text-primary">My Values</h3>
            <div className="space-y-6">
              {values.map((value, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-background rounded-lg border border-border hover:shadow-lg transition-all">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{value.title}</h4>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Skills in Progress */}
            <div className="mt-8 p-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/20">
              <h4 className="font-semibold text-primary mb-4 flex items-center gap-2">
                <Video className="h-5 w-5" />
                Currently Learning
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Video Editing</p>
                  <p className="text-sm text-muted-foreground">Beginner Level</p>
                </div>
                <div>
                  <p className="font-medium">C Programming</p>
                  <p className="text-sm text-muted-foreground">Learning Basics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
