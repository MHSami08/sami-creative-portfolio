// Translation utility for English and Bangla
export const translations = {
  en: {
    // Navigation
    home: 'Home',
    portfolio: 'Portfolio',
    about: 'About',
    myAim: 'My Aim',
    services: 'Services',
    contact: 'Contact',
    developerSpace: "Developer's Space",
    
    // Hero Section
    greeting: 'Assalamu Alaikum',
    imMHSami: "I'm MH Sami",
    passionate: 'A Passionate',
    videoEditor: 'Video Editor',
    creatingMeaningful: 'creating meaningful content following',
    islamicPrinciples: 'Islamic principles',
    viewMyWork: 'View My Work',
    contactMe: 'Contact Me',
    yearsExp: 'Years Exp.',
    project: 'Project',
    quality: 'Quality',
    
    // Portfolio
    longVideos: 'Long videos',
    shortVideos: 'Short videos',
    extendedContent: 'Extended content with cinematic storytelling',
    quickImpactful: 'Quick impactful content',
    readyToWatch: 'Ready to Watch',
    ready: 'Ready',
    readyToCollaborate: 'Ready to Collaborate?',
    openForProjects: 'Open for projects and collaborations. Let\'s create something amazing together!',
    getInTouch: 'Get In Touch',
    
    // Contact
    letsConnect: "Let's Connect",
    sendMessage: 'Send a Message',
    fullName: 'Full Name',
    emailAddress: 'Email Address',
    message: 'Message',
    sendingMessage: 'Sending...',
    sendMessageBtn: 'Send Message',
    messageSent: 'Message Sent!',
    responseTime: 'Response Time',
    
    // Footer
    allRightsReserved: 'All rights reserved.',
  },
  bn: {
    // Navigation
    home: 'হোম',
    portfolio: 'পোর্টফোলিও',
    about: 'সম্পর্কে',
    myAim: 'আমার লক্ষ্য',
    services: 'সেবাসমূহ',
    contact: 'যোগাযোগ',
    developerSpace: 'ডেভেলপার স্পেস',
    
    // Hero Section
    greeting: 'আসসালামু আলাইকুম',
    imMHSami: 'আমি এম এইচ সামি',
    passionate: 'একজন উৎসাহী',
    videoEditor: 'ভিডিও এডিটর',
    creatingMeaningful: 'অর্থবহ কন্টেন্ট তৈরি করছি',
    islamicPrinciples: 'ইসলামিক নীতিমালা অনুসরণ করে',
    viewMyWork: 'আমার কাজ দেখুন',
    contactMe: 'যোগাযোগ করুন',
    yearsExp: 'বছরের অভিজ্ঞতা',
    project: 'প্রজেক্ট',
    quality: 'মান',
    
    // Portfolio
    longVideos: 'দীর্ঘ ভিডিও',
    shortVideos: 'শর্ট ভিডিও',
    extendedContent: 'সিনেমাটিক গল্প বলার সাথে দীর্ঘ কন্টেন্ট',
    quickImpactful: 'দ্রুত প্রভাবশালী কন্টেন্ট',
    readyToWatch: 'দেখার জন্য প্রস্তুত',
    ready: 'প্রস্তুত',
    readyToCollaborate: 'সহযোগিতার জন্য প্রস্তুত?',
    openForProjects: 'প্রজেক্ট এবং সহযোগিতার জন্য উন্মুক্ত। চলুন একসাথে অসাধারণ কিছু তৈরি করি!',
    getInTouch: 'যোগাযোগ করুন',
    
    // Contact
    letsConnect: 'সংযুক্ত হই',
    sendMessage: 'বার্তা পাঠান',
    fullName: 'পূর্ণ নাম',
    emailAddress: 'ইমেইল ঠিকানা',
    message: 'বার্তা',
    sendingMessage: 'পাঠানো হচ্ছে...',
    sendMessageBtn: 'বার্তা পাঠান',
    messageSent: 'বার্তা পাঠানো হয়েছে!',
    responseTime: 'প্রতিক্রিয়া সময়',
    
    // Footer
    allRightsReserved: 'সর্বস্বত্ব সংরক্ষিত।',
  }
};

export type Language = 'en' | 'bn';

export const getTranslation = (key: string, language: Language = 'en'): string => {
  const keys = key.split('.');
  let value: any = translations[language];
  
  for (const k of keys) {
    value = value[k];
    if (!value) return key; // Return key if translation not found
  }
  
  return value;
};
