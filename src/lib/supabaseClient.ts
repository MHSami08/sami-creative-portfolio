import { supabase } from "@/integrations/supabase/client";

export interface VideoProject {
  id: number;
  title: string;
  description: string;
  category: 'long' | 'short';
  tools: string[];
  video_url: string;
  thumbnail: string | null;
  status: 'draft' | 'published' | 'archived';
  views: number;
  likes: number;
  duration: string | null;
  tags: string[];
  client_name: string | null;
  project_date: string | null;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

// Fetch all published projects
export const fetchProjects = async (): Promise<VideoProject[]> => {
  const { data, error } = await supabase
    .from('video_projects')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }

  return (data || []) as VideoProject[];
};

// Fetch projects by category
export const fetchProjectsByCategory = async (category: 'long' | 'short'): Promise<VideoProject[]> => {
  const { data, error } = await supabase
    .from('video_projects')
    .select('*')
    .eq('status', 'published')
    .eq('category', category)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }

  return (data || []) as VideoProject[];
};
