
import { Video, Code, Palette, Star } from 'lucide-react';

const Services = () => {
  const futureServices = [
    {
      icon: Video,
      title: "Video Editing",
      description: "Creative, Islamic-friendly content editing for social media, educational content, and personal projects",
      features: ["Social Media Videos", "Educational Content", "Islamic Content", "Basic Transitions"]
    },
    {
      icon: Code,
      title: "Simple Programming",
      description: "Basic C programming assistance and simple algorithm implementations as I continue learning",
      features: ["Basic C Programs", "Simple Algorithms", "Learning Support", "Code Review"]
    },
    {
      icon: Palette,
      title: "Creative Collaboration",
      description: "Collaborative work on creative projects with fellow learners and content creators",
      features: ["Content Planning", "Creative Ideas", "Islamic Themes", "Community Projects"]
    }
  ];

  return (
    <section className="py-20 bg-card geometric-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What I Plan to Offer</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I am learning video editing and plan to offer creative, Islamic-friendly content editing 
            services in the near future. Feel free to reach out for collaboration or small projects.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {futureServices.map((service, index) => (
            <div 
              key={index}
              className="bg-background border border-border rounded-lg p-8 hover:shadow-lg transition-all hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <service.icon className="h-8 w-8 text-primary" />
              </div>
              
              <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
              <p className="text-muted-foreground mb-6">{service.description}</p>
              
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 text-accent fill-current" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-8 border border-primary/20">
            <h3 className="text-2xl font-bold mb-4 text-primary">Ready to Collaborate?</h3>
            <p className="text-muted-foreground mb-6 text-lg">
              While I'm still in the learning phase, I'm open to small projects and collaborations 
              that will help me grow. Let's create something meaningful together, In shaa Allah.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="text-center p-4 bg-background rounded-lg border border-border">
                <h4 className="font-semibold text-primary mb-2">Current Focus</h4>
                <p className="text-sm text-muted-foreground">Learning video editing techniques and C programming fundamentals</p>
              </div>
              <div className="text-center p-4 bg-background rounded-lg border border-border">
                <h4 className="font-semibold text-accent mb-2">Open For</h4>
                <p className="text-sm text-muted-foreground">Small projects, collaborations, and learning opportunities</p>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Journey */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold mb-6 text-primary">My Learning Journey</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">Video Editing</span>
            <span className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">C Programming</span>
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">Creative Content</span>
            <span className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">Islamic Values</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
