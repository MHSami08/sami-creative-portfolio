import { useState } from 'react';
import { MapPin, Send, CheckCircle } from 'lucide-react';
import { FaFacebook, FaYoutube, FaTiktok } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import emailjs from '@emailjs/browser';
import { useContent } from '@/hooks/useContent';

const Contact = () => {
  const { content } = useContent();

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!content) {
    return (
      <section className="py-20 text-center text-muted-foreground text-lg">
        Loading contact details...
      </section>
    );
  }

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCardClick = (link: string | null) => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  const contactInfo = [
    {
      icon: FaYoutube,
      title: 'YouTube',
      value: 'MH_officialYT',
      link: 'https://youtube.com/@mhsami-08?si=u3EFol8eZyvqnfzw',
      color: 'from-red-600 to-red-700 dark:from-red-400 dark:to-red-500',
      bgColor:
        'from-red-600/10 to-red-700/10 dark:from-red-400/20 dark:to-red-500/20',
      borderColor: 'border-red-500/30 dark:border-red-400/50',
      glowColor: 'dark:shadow-red-400/50',
    },
    {
      icon: FaFacebook,
      title: 'Facebook',
      value: 'MH Sami',
      link: 'https://www.facebook.com/share/19Fwc5eFu2/',
      color: 'from-blue-700 to-blue-800 dark:from-blue-400 dark:to-blue-500',
      bgColor:
        'from-blue-700/10 to-blue-800/10 dark:from-blue-400/20 dark:to-blue-500/20',
      borderColor: 'border-blue-600/30 dark:border-blue-400/50',
      glowColor: 'dark:shadow-blue-400/50',
    },
    {
      icon: FaTiktok,
      title: 'TikTok',
      value: 'MH_officialYT',
      link: 'https://www.tiktok.com/@mh_sami25?_t=ZS-8xReoXChhq5&_r=1',
      color: 'from-purple-600 to-purple-700 dark:from-purple-400 dark:to-purple-500',
      bgColor:
        'from-purple-600/10 to-purple-700/10 dark:from-purple-400/20 dark:to-purple-500/20',
      borderColor: 'border-purple-600/30 dark:border-purple-400/50',
      glowColor: 'dark:shadow-purple-400/50',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Bangladesh',
      link: null,
      color: 'from-emerald-600 to-emerald-700 dark:from-emerald-400 dark:to-emerald-500',
      bgColor:
        'from-emerald-600/10 to-emerald-700/10 dark:from-emerald-400/20 dark:to-emerald-500/20',
      borderColor: 'border-emerald-600/30 dark:border-emerald-400/50',
      glowColor: 'dark:shadow-emerald-400/50',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50/30 via-background to-blue-50/30 dark:from-emerald-900/10 dark:via-background dark:to-blue-900/10 relative overflow-hidden">
      {/* Content omitted for brevity; implement your UI here using content.contact */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">{content.contact.title}</h2>
            <p className="text-muted-foreground mb-6">{content.contact.subtitle}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  name="name"
                  placeholder={content.contact.formLabels.name}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder={content.contact.formLabels.email}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Textarea
                  name="message"
                  placeholder={content.contact.formLabels.message}
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                />
              </div>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : content.contact.formLabels.submit}
                <Send className="ml-2 h-4 w-4" />
              </Button>
              {isSubmitted && (
                <p className="text-emerald-500 flex items-center mt-2">
                  <CheckCircle className="h-4 w-4 mr-2" /> Message sent successfully!
                </p>
              )}
            </form>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {contactInfo.map((c, idx) => (
              <Card
                key={idx}
                className={`cursor-pointer bg-gradient-to-br ${c.bgColor} ${c.borderColor}`}
                onClick={() => handleCardClick(c.link)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <c.icon />
                    {c.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>{c.value}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
