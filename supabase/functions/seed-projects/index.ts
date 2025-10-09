import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

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
      }
    ];

    // Check if projects already exist
    const { data: existingProjects } = await supabaseClient
      .from('video_projects')
      .select('id')
      .limit(1);

    if (existingProjects && existingProjects.length > 0) {
      return new Response(
        JSON.stringify({ message: 'Projects already seeded' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    // Insert projects
    const { error: insertError } = await supabaseClient
      .from('video_projects')
      .insert(initialProjects);

    if (insertError) {
      throw insertError;
    }

    return new Response(
      JSON.stringify({ message: 'Projects seeded successfully', count: initialProjects.length }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
