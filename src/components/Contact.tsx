
import { useState } from 'react';
import { MapPin, Send, CheckCircle } from 'lucide-react';
import { FaFacebook, FaYoutube, FaTiktok } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        'service_gjv2lol',
        'template_up88ozh',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        'nOoj81ggjwYf097Gj'
      );
      
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: FaYoutube,
      title: "YouTube",
      value: "MH_officialYT",
      link: "https://youtube.com/@mhsami-08?si=u3EFol8eZyvqnfzw",
      color: "from-red-500 to-red-600",
      bgColor: "from-red-500/10 to-red-600/10",
      borderColor: "border-red-400/30"
    },
    {
      icon: FaFacebook,
      title: "Facebook",
      value: "MH Sami",
      link: "https://www.facebook.com/share/19Fwc5eFu2/",
      color: "from-blue-600 to-blue-800",
      bgColor: "from-blue-600/10 to-blue-800/10",
      borderColor: "border-blue-400/30"
    },
    {
      icon: FaTiktok,
      title: "TikTok",
      value: "MH_officialYT",
      link: "https://www.tiktok.com/@mh_sami25?_t=ZS-8xReoXChhq5&_r=1",
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-500/10 to-purple-600/10",
      borderColor: "border-purple-400/30"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Bangladesh",
      link: null,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "from-emerald-500/10 to-emerald-600/10",
      borderColor: "border-emerald-400/30"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50/30 via-background to-blue-50/30 dark:from-emerald-900/10 dark:via-background dark:to-blue-900/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b981/05_1px,transparent_1px),linear-gradient(to_bottom,#10b981/05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
              Let's Connect
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I'd love to hear from you! Whether you have a project idea, want to collaborate, 
            or just want to say hello, feel free to reach out.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Enhanced Contact Form */}
          <Card className="bg-gradient-to-br from-emerald-500/5 to-blue-500/5 backdrop-blur-xl border border-emerald-400/30 shadow-2xl shadow-emerald-500/10">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                  Send a Message
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4 animate-bounce" />
                  <h3 className="text-xl font-semibold text-emerald-600 mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">جزاك الله خيرا! I'll get back to you soon, Insha'Allah.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-background/50 backdrop-blur-sm border-emerald-400/30 focus:border-emerald-400 focus:ring-emerald-400/20"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-background/50 backdrop-blur-sm border-emerald-400/30 focus:border-emerald-400 focus:ring-emerald-400/20"
                      placeholder="Enter your email address"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full resize-none bg-background/50 backdrop-blur-sm border-emerald-400/30 focus:border-emerald-400 focus:ring-emerald-400/20"
                      placeholder="Tell me about your project or just say hello..."
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-4 text-lg rounded-xl font-semibold shadow-xl shadow-emerald-500/25 hover:shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-105 group disabled:opacity-50 disabled:cursor-not-allowed border border-emerald-400/30"
                  >
                    <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold mb-8">
                <span className="bg-gradient-to-r from-amber-400 to-emerald-500 bg-clip-text text-transparent">
                  Get In Touch
                </span>
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                I'm always excited to discuss new projects and opportunities. 
                Whether you're looking for video editing services or just want to connect, 
                I'm here to help, بإذن الله.
              </p>
            </div>

            {/* Professional Social Media Cards in Grid */}
            <div className="grid grid-cols-1 gap-4">
              {contactInfo.map((info, index) => (
                <Card key={index} className={`group hover:shadow-xl transition-all duration-300 bg-gradient-to-r ${info.bgColor} backdrop-blur-lg border ${info.borderColor} hover:scale-105`}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${info.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <info.icon size={28} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-foreground text-lg">{info.title}</h4>
                        {info.link ? (
                          <a 
                            href={info.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 transition-colors font-medium"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-muted-foreground font-medium">{info.value}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Info */}
            <Card className="bg-gradient-to-r from-amber-500/10 to-emerald-500/10 backdrop-blur-lg border border-amber-400/30 shadow-lg">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-foreground mb-3">Response Time</h4>
                <p className="text-muted-foreground">
                  I typically respond within 24-48 hours, Insha'Allah. 
                  For urgent matters, please mention it in your message.
                </p>
              </CardContent>
            </Card>

            {/* Islamic Touch */}
            <div className="text-center p-6 bg-gradient-to-r from-amber-500/10 to-emerald-500/10 rounded-2xl border border-amber-400/30 backdrop-blur-lg">
              <p className="text-amber-400 dark:text-amber-300 font-amiri text-lg font-medium">
                "وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ"
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                "And my success is not but through Allah"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
