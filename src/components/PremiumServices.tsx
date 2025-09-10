import { motion } from 'framer-motion';
import { Check, Sparkles, Crown, Zap, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface PremiumServicesProps {
  language: 'en' | 'bn';
}

const PremiumServices = ({ language }: PremiumServicesProps) => {
  const content = {
    en: {
      title: "Service Packages",
      subtitle: "Professional video editing solutions for every need",
      mostPopular: "Most Popular",
      getStarted: "Get Started",
      contactUs: "Contact Us",
      allFeatures: "Everything in Basic, plus:",
      premiumFeatures: "Everything in Premium, plus:"
    },
    bn: {
      title: "সেবা প্যাকেজ",
      subtitle: "প্রতিটি প্রয়োজনের জন্য পেশাদার ভিডিও এডিটিং সমাধান",
      mostPopular: "সবচেয়ে জনপ্রিয়",
      getStarted: "শুরু করুন",
      contactUs: "যোগাযোগ করুন",
      allFeatures: "বেসিকের সবকিছু, এবং:",
      premiumFeatures: "প্রিমিয়ামের সবকিছু, এবং:"
    }
  };

  const text = content[language];

  const packages = [
    {
      name: "Basic",
      namebn: "বেসিক",
      price: "$299",
      period: "/project",
      description: "Perfect for simple projects and social media content",
      descriptionbn: "সাধারণ প্রকল্প এবং সামাজিক মিডিয়া কন্টেন্টের জন্য নিখুঁত",
      icon: Zap,
      color: "from-blue-500 to-cyan-500",
      popular: false,
      features: [
        "Basic color correction",
        "Simple transitions",
        "Audio sync & cleanup",
        "1080p export",
        "2 revision rounds",
        "3-5 day delivery"
      ],
      featuresbn: [
        "বেসিক কালার কারেকশন",
        "সাধারণ ট্রানজিশন",
        "অডিও সিঙ্ক ও পরিষ্কার",
        "১০৮০পি এক্সপোর্ট",
        "২ রিভিশন রাউন্ড",
        "৩-৫ দিন ডেলিভারি"
      ]
    },
    {
      name: "Premium",
      namebn: "প্রিমিয়াম",
      price: "$599",
      period: "/project",
      description: "Advanced editing with cinematic quality",
      descriptionbn: "সিনেমাটিক মানসহ উন্নত এডিটিং",
      icon: Crown,
      color: "from-emerald-500 to-blue-600",
      popular: true,
      features: [
        "Advanced color grading",
        "Custom motion graphics",
        "Professional audio mixing",
        "4K export capability",
        "Unlimited revisions",
        "1-2 day delivery",
        "Custom thumbnails",
        "Social media optimization"
      ],
      featuresbn: [
        "উন্নত কালার গ্রেডিং",
        "কাস্টম মোশন গ্রাফিক্স",
        "পেশাদার অডিও মিক্সিং",
        "৪কে এক্সপোর্ট সুবিধা",
        "সীমাহীন রিভিশন",
        "১-২ দিন ডেলিভারি",
        "কাস্টম থাম্বনেইল",
        "সামাজিক মিডিয়া অপটিমাইজেশন"
      ]
    },
    {
      name: "Cinematic",
      namebn: "সিনেমাটিক",
      price: "$999",
      period: "/project",
      description: "Hollywood-level production quality",
      descriptionbn: "হলিউড-স্তরের প্রোডাকশন মান",
      icon: Sparkles,
      color: "from-purple-500 to-pink-600",
      popular: false,
      features: [
        "Cinematic color grading",
        "Advanced VFX & animations",
        "Professional sound design",
        "RAW footage support",
        "Multiple format exports",
        "Same-day delivery",
        "Complete branding package",
        "Priority support",
        "Project consultation"
      ],
      featuresbn: [
        "সিনেমাটিক কালার গ্রেডিং",
        "উন্নত ভিএফএক্স ও অ্যানিমেশন",
        "পেশাদার সাউন্ড ডিজাইন",
        "র সাপোর্ট",
        "একাধিক ফরম্যাট এক্সপোর্ট",
        "একই দিন ডেলিভারি",
        "সম্পূর্ণ ব্র্যান্ডিং প্যাকেজ",
        "অগ্রাধিকার সাপোর্ট",
        "প্রকল্প পরামর্শ"
      ]
    }
  ];

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900/20 to-background" id="services">
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

        {/* Packages Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                    <Star className="w-4 h-4 inline mr-1" />
                    {text.mostPopular}
                  </div>
                </div>
              )}

              <Card className={`relative overflow-hidden h-full transition-all duration-500 hover:scale-105 ${
                pkg.popular 
                  ? 'border-emerald-400/50 bg-gradient-to-b from-emerald-500/5 to-blue-500/5' 
                  : 'border-gray-700/50 bg-gray-900/30'
              } backdrop-blur-lg`}>
                {/* Package Header */}
                <div className="p-8 text-center border-b border-gray-700/50">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${pkg.color} flex items-center justify-center shadow-lg`}>
                    <pkg.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {language === 'en' ? pkg.name : pkg.namebn}
                  </h3>
                  
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {language === 'en' ? pkg.description : pkg.descriptionbn}
                  </p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">{pkg.price}</span>
                    <span className="text-gray-400 ml-1">{pkg.period}</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="p-8 flex-grow">
                  <ul className="space-y-4">
                    {(language === 'en' ? pkg.features : pkg.featuresbn).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${pkg.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="p-8 pt-0">
                  <Button
                    onClick={scrollToContact}
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${
                      pkg.popular
                        ? `bg-gradient-to-r ${pkg.color} text-white shadow-lg hover:shadow-xl`
                        : 'border-2 border-gray-600 text-gray-300 hover:border-gray-500 bg-transparent hover:bg-gray-800/50'
                    }`}
                  >
                    {pkg.popular ? text.getStarted : text.contactUs}
                  </Button>
                </div>

                {/* Glow Effect for Popular */}
                {pkg.popular && (
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-xl pointer-events-none" />
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Services Note */}
        <motion.div
          className="text-center mt-16 p-8 bg-gray-900/30 backdrop-blur-lg border border-gray-700/50 rounded-2xl max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Sparkles className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-4">
            {language === 'en' ? 'Custom Solutions Available' : 'কাস্টম সমাধান উপলব্ধ'}
          </h3>
          <p className="text-gray-300 leading-relaxed mb-6">
            {language === 'en' 
              ? 'Need something specific? I offer custom video editing solutions tailored to your unique requirements. From documentaries to commercial ads, let\'s discuss your vision.'
              : 'কিছু নির্দিষ্ট প্রয়োজন? আমি আপনার অনন্য প্রয়োজনীয়তা অনুযায়ী কাস্টম ভিডিও এডিটিং সমাধান অফার করি। তথ্যচিত্র থেকে বাণিজ্যিক বিজ্ঞাপন পর্যন্ত, আসুন আপনার দৃষ্টিভঙ্গি নিয়ে আলোচনা করি।'
            }
          </p>
          <Button
            onClick={scrollToContact}
            variant="outline"
            className="border-emerald-400/50 text-emerald-400 hover:bg-emerald-500/10 transition-all duration-300"
          >
            {language === 'en' ? 'Discuss Custom Project' : 'কাস্টম প্রকল্প নিয়ে আলোচনা'}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PremiumServices;