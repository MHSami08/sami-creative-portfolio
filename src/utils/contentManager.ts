export interface SiteContent {
  navigation: {
    brandName: string;
    menuItems: Array<{ name: string; href: string; }>;
  };
  hero: {
    greeting: string;
    greetingArabic: string;
    name: string;
    tagline: string;
    islamicQuote: string;
    islamicQuoteTranslation: string;
    profileImage: string;
    ctaButtons: {
      primary: string;
      secondary: string;
    };
    stats: Array<{
      value: string;
      label: string;
    }>;
  };
  about: {
    bismillah: string;
    title: string;
    description: string[];
    values: Array<{
      title: string;
      description: string;
    }>;
    timeline: Array<{
      year: string;
      title: string;
      description: string;
      status: 'completed' | 'current' | 'future';
    }>;
    statsSection: Array<{
      label: string;
      value: string;
    }>;
  };
  services: {
    title: string;
    subtitle: string;
    services: Array<{
      title: string;
      description: string;
      features: string[];
      status: string;
    }>;
    principles: Array<{
      title: string;
      description: string;
    }>;
    cta: {
      title: string;
      description: string;
      buttons: {
        primary: string;
        secondary: string;
      };
    };
  };
  contact: {
    title: string;
    subtitle: string;
    formLabels: {
      name: string;
      email: string;
      message: string;
      submit: string;
    };
    contactInfo: Array<{
      type: string;
      value: string;
      label: string;
    }>;
  };
  myAim: {
    title: string;
    subtitle: string;
    goals: Array<{
      title: string;
      description: string;
    }>;
  };
  footer: {
    copyright: string;
    arabicText: string;
  };
}

const defaultContent: SiteContent = {
  navigation: {
    brandName: "MH Sami",
    menuItems: [
      { name: 'Home', href: '#home' },
      { name: 'Portfolio', href: '#portfolio' },
      { name: 'About', href: '#about' },
      { name: 'My Aim', href: '#myaim' },
      { name: 'Services', href: '#services' },
      { name: 'Contact', href: '#contact' },
      { name: "Developer's Space", href: '/developer-space' },
    ]
  },
  hero: {
    greeting: "Assalamu Alaikum",
    greetingArabic: "السلام عليكم",
    name: "I'm MH Sami",
    tagline: "A Passionate Video Editor creating meaningful content following Islamic principles.",
    islamicQuote: "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ مُحَمَّدٌ رَسُولُ ٱللَّٰهِ",
    islamicQuoteTranslation: "There is no god but Allah, Muhammad(Sa.) is the messenger of Allah",
    profileImage: "https://i.postimg.cc/8zn3mQ1z/Screenshot-2025-06-16-22-41-45-730-com-alightcreative-motion-edit.jpg",
    ctaButtons: {
      primary: "View My Work",
      secondary: "Contact Me"
    },
    stats: [
      { value: "1+", label: "Years Exp." },
      { value: "1", label: "Project" },
      { value: "Best", label: "Quality" }
    ]
  },
  about: {
    bismillah: "بسم الله الرحمن الرحيم",
    title: "About Me",
    description: [
      "I am an ordinary Muslim, passionate about EDITING. Though I am at the beginning of my journey, I am deeply committed to growing and sharing my creative work.",
      "My goal is to create content that is both meaningful and halal, contributing positively to our community while honing my technical skills."
    ],
    values: [
      {
        title: "Sincerity (Ikhlas)",
        description: "Everything I do is for the sake of Allah"
      },
      {
        title: "Simplicity",
        description: "Finding beauty in modest and humble approaches"
      },
      {
        title: "Dedication",
        description: "Committed to continuous learning and improvement"
      }
    ],
    timeline: [
      {
        year: "2025",
        title: "SSC Examination",
        description: "Successfully completed Secondary School Certificate",
        status: "completed"
      },
      {
        year: "2025",
        title: "Learning Phase",
        description: "Currently learning Video Editing",
        status: "current"
      },
      {
        year: "2026",
        title: "Future Goals",
        description: "Planning to offer Professional Editing services",
        status: "future"
      }
    ],
    statsSection: [
      { label: "Learning Hours", value: "100+" },
      { label: "Projects Planned", value: "5+" },
      { label: "Skills Growing", value: "2" },
      { label: "Years Ahead", value: "Many" }
    ]
  },
  services: {
    title: "What I Plan to Offer",
    subtitle: "I am learning video editing and plan to offer creative, Islamic-friendly content editing services in the near future. Feel free to reach out for collaboration or small projects.",
    services: [
      {
        title: "Video Editing",
        description: "Creative and Islamic-friendly content editing for social media, YouTube, and personal projects.",
        features: ["Basic cuts and transitions", "Color correction", "Audio synchronization", "Islamic-compliant content"],
        status: "Learning"
      },
      {
        title: "Content Creation",
        description: "Helping create meaningful, halal content that resonates with Muslim audiences.",
        features: ["Social media content", "Educational videos", "Islamic themes", "Community projects"],
        status: "Planning"
      }
    ],
    principles: [
      {
        title: "Halal Content Only",
        description: "All projects must align with Islamic principles and values."
      },
      {
        title: "Timely Delivery",
        description: "Committed to meeting deadlines and maintaining trust."
      },
      {
        title: "Continuous Learning",
        description: "Always improving skills to provide better service quality."
      }
    ],
    cta: {
      title: "Ready to Collaborate?",
      description: "Whether you have a small project or want to discuss future collaborations, I'd love to hear from you. Let's create something meaningful together, In shaa Allah.",
      buttons: {
        primary: "Get In Touch",
        secondary: "View Portfolio"
      }
    }
  },
  contact: {
    title: "Let's Connect",
    subtitle: "Have a project in mind or want to collaborate? I'd love to hear from you.",
    formLabels: {
      name: "Your Name",
      email: "Your Email",
      message: "Your Message",
      submit: "Send Message"
    },
    contactInfo: [
      { type: "email", value: "mhsamiofficial@gmail.com", label: "Email" },
      { type: "phone", value: "+880 123 456 789", label: "Phone" }
    ]
  },
  myAim: {
    title: "My Aim",
    subtitle: "My goals and aspirations in the journey of video editing and content creation.",
    goals: [
      {
        title: "Skill Development",
        description: "Master advanced video editing techniques and software"
      },
      {
        title: "Islamic Content",
        description: "Create meaningful content that follows Islamic principles"
      },
      {
        title: "Community Impact",
        description: "Contribute positively to the Muslim community through content"
      }
    ]
  },
  footer: {
    copyright: "© 2025 MH Sami. All rights reserved.",
    arabicText: "جزاك الله خيرا"
  }
};

class ContentManager {
  private static instance: ContentManager;
  private content: SiteContent;
  private listeners: Array<(content: SiteContent) => void> = [];

  private constructor() {
    this.content = this.loadContent();
  }

  static getInstance(): ContentManager {
    if (!ContentManager.instance) {
      ContentManager.instance = new ContentManager();
    }
    return ContentManager.instance;
  }

  private loadContent(): SiteContent {
    try {
      const saved = localStorage.getItem('siteContent');
      return saved ? JSON.parse(saved) : defaultContent;
    } catch {
      return defaultContent;
    }
  }

  private saveContent(): void {
    localStorage.setItem('siteContent', JSON.stringify(this.content));
    this.notifyListeners();
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.content));
  }

  subscribe(listener: (content: SiteContent) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  getContent(): SiteContent {
    return { ...this.content };
  }

  updateContent(section: keyof SiteContent, data: any): void {
    this.content = {
      ...this.content,
      [section]: data
    };
    this.saveContent();
  }

  resetToDefaults(): void {
    this.content = { ...defaultContent };
    this.saveContent();
  }

  exportContent(): string {
    return JSON.stringify(this.content, null, 2);
  }

  importContent(contentJson: string): void {
    try {
      const imported = JSON.parse(contentJson);
      this.content = { ...defaultContent, ...imported };
      this.saveContent();
    } catch (error) {
      throw new Error('Invalid content format');
    }
  }
}

export default ContentManager;