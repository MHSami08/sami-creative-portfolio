import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Calendar, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';

interface ContactBookingProps {
  language: 'en' | 'bn';
}

const ContactBooking = ({ language }: ContactBookingProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    message: '',
    timeline: ''
  });

  const content = {
    en: {
      title: "Let's Create Something Amazing",
      subtitle: "Ready to bring your vision to life? Get in touch!",
      form: {
        name: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        projectType: "Project Type",
        budget: "Budget Range",
        timeline: "Project Timeline",
        message: "Project Details",
        submit: "Send Message",
        schedule: "Schedule a Call"
      },
      projectTypes: {
        placeholder: "Select project type",
        social: "Social Media Content",
        commercial: "Commercial/Advertisement",
        documentary: "Documentary",
        educational: "Educational Content",
        wedding: "Wedding/Event",
        other: "Other"
      },
      budgets: {
        placeholder: "Select budget range",
        basic: "$200 - $500",
        premium: "$500 - $1000",
        cinematic: "$1000 - $2000",
        custom: "$2000+"
      },
      timelines: {
        placeholder: "When do you need this?",
        rush: "ASAP (Rush job)",
        week: "Within a week",
        month: "Within a month",
        flexible: "I'm flexible"
      },
      contact: {
        email: "mhsami.editor@gmail.com",
        phone: "+880 1234 567890",
        location: "Dhaka, Bangladesh",
        hours: "9 AM - 9 PM (GMT+6)"
      }
    },
    bn: {
      title: "আসুন অসাধারণ কিছু তৈরি করি",
      subtitle: "আপনার দৃষ্টিভঙ্গি বাস্তবায়িত করার জন্য প্রস্তুত? যোগাযোগ করুন!",
      form: {
        name: "পূর্ণ নাম",
        email: "ইমেইল ঠিকানা",
        phone: "ফোন নম্বর",
        projectType: "প্রকল্পের ধরন",
        budget: "বাজেট রেঞ্জ",
        timeline: "প্রকল্পের সময়সীমা",
        message: "প্রকল্পের বিস্তারিত",
        submit: "বার্তা পাঠান",
        schedule: "কল সময়সূচী"
      },
      projectTypes: {
        placeholder: "প্রকল্পের ধরন নির্বাচন করুন",
        social: "সামাজিক মিডিয়া কন্টেন্ট",
        commercial: "বাণিজ্যিক/বিজ্ঞাপন",
        documentary: "তথ্যচিত্র",
        educational: "শিক্ষামূলক কন্টেন্ট",
        wedding: "বিবাহ/অনুষ্ঠান",
        other: "অন্যান্য"
      },
      budgets: {
        placeholder: "বাজেট রেঞ্জ নির্বাচন করুন",
        basic: "২০০ - ৫০০ ডলার",
        premium: "৫০০ - ১০০০ ডলার",
        cinematic: "১০০০ - ২০০০ ডলার",
        custom: "২০০০+ ডলার"
      },
      timelines: {
        placeholder: "কখন প্রয়োজন?",
        rush: "যত তাড়াতাড়ি সম্ভব",
        week: "এক সপ্তাহের মধ্যে",
        month: "এক মাসের মধ্যে",
        flexible: "আমি নমনীয়"
      },
      contact: {
        email: "mhsami.editor@gmail.com",
        phone: "+৮৮০ ১২৩৪ ৫৬৭৮৯০",
        location: "ঢাকা, বাংলাদেশ",
        hours: "সকাল ৯টা - রাত ৯টা (GMT+6)"
      }
    }
  };

  const text = content[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-gray-900/20" id="contact">
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

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="p-8 bg-gray-900/30 backdrop-blur-lg border border-gray-700/50">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">{text.form.name}</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-emerald-400"
                      placeholder={text.form.name}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">{text.form.email}</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-emerald-400"
                      placeholder={text.form.email}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">{text.form.phone}</label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-emerald-400"
                      placeholder={text.form.phone}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">{text.form.projectType}</label>
                    <Select value={formData.projectType} onValueChange={(value) => handleInputChange('projectType', value)}>
                      <SelectTrigger className="bg-gray-800/50 border-gray-600/50 text-white">
                        <SelectValue placeholder={text.projectTypes.placeholder} />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="social">{text.projectTypes.social}</SelectItem>
                        <SelectItem value="commercial">{text.projectTypes.commercial}</SelectItem>
                        <SelectItem value="documentary">{text.projectTypes.documentary}</SelectItem>
                        <SelectItem value="educational">{text.projectTypes.educational}</SelectItem>
                        <SelectItem value="wedding">{text.projectTypes.wedding}</SelectItem>
                        <SelectItem value="other">{text.projectTypes.other}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">{text.form.budget}</label>
                    <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                      <SelectTrigger className="bg-gray-800/50 border-gray-600/50 text-white">
                        <SelectValue placeholder={text.budgets.placeholder} />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="basic">{text.budgets.basic}</SelectItem>
                        <SelectItem value="premium">{text.budgets.premium}</SelectItem>
                        <SelectItem value="cinematic">{text.budgets.cinematic}</SelectItem>
                        <SelectItem value="custom">{text.budgets.custom}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">{text.form.timeline}</label>
                    <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                      <SelectTrigger className="bg-gray-800/50 border-gray-600/50 text-white">
                        <SelectValue placeholder={text.timelines.placeholder} />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="rush">{text.timelines.rush}</SelectItem>
                        <SelectItem value="week">{text.timelines.week}</SelectItem>
                        <SelectItem value="month">{text.timelines.month}</SelectItem>
                        <SelectItem value="flexible">{text.timelines.flexible}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">{text.form.message}</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-emerald-400 min-h-[120px]"
                    placeholder={text.form.message}
                    required
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    {text.form.submit}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 border-emerald-400/50 text-emerald-400 hover:bg-emerald-500/10 py-3 rounded-xl font-semibold"
                    onClick={() => window.open('https://calendly.com/mhsami', '_blank')}
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    {text.form.schedule}
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Contact Details */}
            <Card className="p-6 bg-gray-900/30 backdrop-blur-lg border border-gray-700/50">
              <h3 className="text-xl font-semibold text-white mb-6">
                {language === 'en' ? 'Contact Information' : 'যোগাযোগের তথ্য'}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white">{text.contact.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">{language === 'en' ? 'Phone' : 'ফোন'}</p>
                    <p className="text-white">{text.contact.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">{language === 'en' ? 'Location' : 'অবস্থান'}</p>
                    <p className="text-white">{text.contact.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">{language === 'en' ? 'Working Hours' : 'কাজের সময়'}</p>
                    <p className="text-white">{text.contact.hours}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Calendly Embed */}
            <Card className="p-6 bg-gray-900/30 backdrop-blur-lg border border-gray-700/50">
              <h3 className="text-xl font-semibold text-white mb-4">
                {language === 'en' ? 'Schedule a Meeting' : 'মিটিং সময়সূচী'}
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                {language === 'en' 
                  ? 'Book a free consultation to discuss your project in detail.'
                  : 'আপনার প্রকল্প বিস্তারিত আলোচনার জন্য একটি বিনামূল্যে পরামর্শ বুক করুন।'
                }
              </p>
              <div className="aspect-square bg-gray-800/50 rounded-lg flex items-center justify-center border border-gray-600/50">
                <div className="text-center">
                  <Calendar className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm">
                    {language === 'en' ? 'Calendly widget would be embedded here' : 'ক্যালেন্ডলি উইজেট এখানে এম্বেড হবে'}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactBooking;