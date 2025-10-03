
import { Video, Code, Palette, Zap, Clock, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Services = () => {
  const services = [
    {
      icon: Video,
      title: "Video Editing",
      description: "Creative and Islamic-friendly content editing for social media, YouTube, and personal projects.",
      features: ["Basic cuts and transitions", "Color correction", "Audio synchronization", "Islamic-compliant content"],
      status: "Learning",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20"
    },
    {
      icon: Palette,
      title: "Content Creation",
      description: "Helping create meaningful, halal content that resonates with Muslim audiences.",
      features: ["Social media content", "Educational videos", "Islamic themes", "Community projects"],
      status: "Planning",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20"
    }
  ];

  const principles = [
    {
      icon: Shield,
      title: "Halal Content Only",
      description: "All projects must align with Islamic principles and values."
    },
    {
      icon: Clock,
      title: "Timely Delivery",
      description: "Committed to meeting deadlines and maintaining trust."
    },
    {
      icon: Zap,
      title: "Continuous Learning",
      description: "Always improving skills to provide better service quality."
    }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-background via-blue-50/30 to-amber-50/30 dark:from-background dark:via-blue-900/10 dark:to-amber-900/10 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
              What I Plan to Offer
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-center">
            I am learning video editing and plan to offer creative, Islamic-friendly content editing services 
            in the near future. Feel free to reach out for collaboration or small projects.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-20 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <Card key={index} className={`group hover:shadow-xl transition-all duration-500 ${service.bgColor} backdrop-blur-sm border ${service.borderColor} hover:scale-105`}>
              <CardHeader className="text-center pb-4 px-4 sm:px-6">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground">{service.title}</CardTitle>
                <div className="flex justify-center">
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                    service.status === 'Learning' 
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                  }`}>
                    {service.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 px-4 sm:px-6 pb-6">
                <p className="text-muted-foreground text-center">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color}`}></div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Principles Section */}
        <div className="mb-12 sm:mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
            <span className="bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
              My Work Principles
            </span>
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {principles.map((principle, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <principle.icon className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-3">{principle.title}</h4>
                <p className="text-muted-foreground">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-background/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-12 border border-border/50">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
              Ready to Collaborate?
            </span>
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
            Whether you have a small project or want to discuss future collaborations, 
            I'd love to hear from you. Let's create something meaningful together, In shaa Allah.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => scrollToSection('#contact')}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Get In Touch
            </Button>
            <Button 
              variant="outline"
              onClick={() => scrollToSection('#portfolio')}
              className="border-2 border-amber-500/50 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-white px-8 py-4 text-lg rounded-xl font-semibold backdrop-blur-sm bg-background/50 transition-all duration-300 hover:scale-105"
            >
              View Portfolio
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
