import { supabase } from "@/integrations/supabase/client";

export const seedDatabaseIfEmpty = async () => {
  try {
    // Check if database already has projects
    const { data: existingProjects, error: checkError } = await supabase
      .from('video_projects')
      .select('id')
      .limit(1);

    if (checkError) {
      console.error('Error checking projects:', checkError);
      return false;
    }

    if (existingProjects && existingProjects.length > 0) {
      console.log('Database already seeded');
      return true;
    }

    // Insert initial projects
    const initialProjects = [
      {
        id: 1,
        title: "Qalbi Fil Madina Vocals Only",
        description: "A beautiful Islamic Slowed & reverb nasheed",
        category: "long",
        status: "published",
        tools: ["VN Video Editor", "Alight motion"],
        duration: "3:29 min",
        video_url: "https://youtu.be/9ovxlUmrAEA?si=gj3cnKNddsWvqspO",
        thumbnail: "https://img.youtube.com/vi/9ovxlUmrAEA/maxresdefault.jpg",
        tags: ["nasheed", "islamic", "vocals"],
        featured: true
      },
      {
        id: 2,
        title: "Surah An-Nisa(75-76)",
        description: "Advanced Quranic reel",
        category: "long",
        status: "published",
        tools: ["Inshot", "Node video"],
        duration: "1:27 min",
        video_url: "https://youtu.be/1QN3Mid2gog?si=3G8n-4q1JdX5FOMH",
        thumbnail: "https://img.youtube.com/vi/1QN3Mid2gog/sddefault.jpg",
        tags: ["quran", "islamic", "reel"],
        featured: false
      },
      {
        id: 5,
        title: "We compare to the yesterday,we don't compare to Zero",
        description: "Islamic Reminder",
        category: "short",
        status: "published",
        tools: ["Capcut", "Inshot"],
        duration: "25 sec",
        video_url: "https://vimeo.com/1102973135",
        thumbnail: "https://i.postimg.cc/LsPVDcZq/IMG-20250721-093048.jpg",
        tags: ["reminder", "short", "islamic"],
        featured: false
      },
      {
        id: 6,
        title: "Islamic Reminder about DEATH",
        description: "High quality video edit",
        category: "short",
        status: "published",
        tools: ["Inshot", "VN Video Editor"],
        duration: "40 sec",
        video_url: "https://vimeo.com/1103527078",
        thumbnail: "https://i.postimg.cc/ydzp33HG/thumb.jpg",
        tags: ["reminder", "short", "death"],
        featured: false
      },
      {
        id: 8,
        title: "Daily Reminder",
        description: "Short Islamic reminder for daily reflection",
        category: "short",
        status: "published",
        tools: ["Inshot", "Alight Motion"],
        duration: "1:00 min",
        video_url: "N/A",
        thumbnail: "https://i.postimg.cc/B6vdXZzW/IMG-20250721-092425.jpg",
        tags: ["reminder", "daily", "islamic"],
        featured: false
      },
      {
        id: 3,
        title: "Nasheed Collection",
        description: "Beautiful Islamic nasheed compilation",
        category: "long",
        status: "published",
        tools: ["Adobe Premiere", "After Effects"],
        duration: "5:30 min",
        video_url: "https://youtu.be/example3",
        thumbnail: "https://img.youtube.com/vi/example3/maxresdefault.jpg",
        tags: ["nasheed", "compilation", "islamic"],
        featured: false
      },
      {
        id: 4,
        title: "Quranic Verses Motion",
        description: "Animated Quranic verses with English translation",
        category: "long",
        status: "published",
        tools: ["After Effects", "Illustrator"],
        duration: "4:15 min",
        video_url: "https://youtu.be/example4",
        thumbnail: "https://img.youtube.com/vi/example4/maxresdefault.jpg",
        tags: ["quran", "animation", "islamic"],
        featured: true
      },
      {
        id: 7,
        title: "Friday Reminder",
        description: "Special Friday (Jummah) reminder",
        category: "short",
        status: "published",
        tools: ["CapCut", "Canva"],
        duration: "45 sec",
        video_url: "https://vimeo.com/example7",
        thumbnail: "https://i.postimg.cc/example7.jpg",
        tags: ["friday", "jummah", "reminder"],
        featured: false
      },
      {
        id: 9,
        title: "Prophetic Wisdom",
        description: "Hadith quote with beautiful visuals",
        category: "short",
        status: "published",
        tools: ["InShot", "PicsArt"],
        duration: "30 sec",
        video_url: "https://vimeo.com/example9",
        thumbnail: "https://i.postimg.cc/example9.jpg",
        tags: ["hadith", "wisdom", "islamic"],
        featured: false
      },
      {
        id: 10,
        title: "Ramadan Special",
        description: "Special Ramadan reminder and motivation",
        category: "long",
        status: "published",
        tools: ["Final Cut Pro", "Motion"],
        duration: "6:00 min",
        video_url: "https://youtu.be/example10",
        thumbnail: "https://img.youtube.com/vi/example10/maxresdefault.jpg",
        tags: ["ramadan", "motivation", "islamic"],
        featured: true
      }
    ];

    const { error: insertError } = await supabase
      .from('video_projects')
      .insert(initialProjects);

    if (insertError) {
      console.error('Error seeding database:', insertError);
      return false;
    }

    console.log('Database seeded successfully with 10 projects');
    return true;
  } catch (error) {
    console.error('Unexpected error seeding database:', error);
    return false;
  }
};
