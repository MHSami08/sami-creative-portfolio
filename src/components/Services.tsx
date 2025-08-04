
import { Video, Code, Palette, Zap, Clock, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useContent } from '@/hooks/useContent';

const Services = () => {
  const { content } = useContent();
  
  if (!content) return null;

  const services = content.services.services.map((service, index) => ({
    ...service,
    icon: index === 0 ? Video : Palette,
    color: index === 0 ? "from-blue-500 to-blue-600" : "from-purple-500 to-purple-600",
    bgColor: index === 0 ? "bg-blue-500/10" : "bg-purple-500/10",
    borderColor: index === 0 ? "border-blue-500/20" : "border-purple-500/20"
  }));

  const principles = content.services.principles.map((principle, index) => ({
    ...principle,
    icon: index === 0 ? Shield : index === 1 ? Clock : Zap
  }));

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
              {content.services.title}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {content.services.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <Card key={index} className={`group hover:shadow-xl transition-all duration-500 ${service.bgColor} backdrop-blur-sm border ${service.borderColor} hover:scale-105`}>
              <CardHeader className="text-center pb-4">
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
              <CardContent className="space-y-4">
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
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
              My Work Principles
            </span>
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
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
        <div className="text-center bg-background/70 backdrop-blur-sm rounded-3xl p-12 border border-border/50">
          <h3 className="text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
              {content.services.cta.title}
            </span>
          </h3>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {content.services.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => scrollToSection('#contact')}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {content.services.cta.buttons.primary}
            </Button>
            <Button 
              variant="outline"
              onClick={() => scrollToSection('#portfolio')}
              className="border-2 border-amber-500/50 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-white px-8 py-4 text-lg rounded-xl font-semibold backdrop-blur-sm bg-background/50 transition-all duration-300 hover:scale-105"
            >
              {content.services.cta.buttons.secondary}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
