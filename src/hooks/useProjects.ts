import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface VideoProject {
  id: number;
  title: string;
  description: string;
  category: 'long' | 'short';
  tools: string[];
  videoUrl: string;
  thumbnail: string | null;
  status: string;
  duration: string | null;
  tags: string[] | null;
  featured: boolean;
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

export const useProjects = () => {
  const [projects, setProjects] = useState<VideoProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('video_projects')
          .select('*')
          .order('id', { ascending: true });

        if (error) {
          console.error('Error fetching projects:', error);
          setError(error.message);
          return;
        }

        // Map database fields to component fields
        const mappedProjects: VideoProject[] = (data || []).map((project) => ({
          id: project.id,
          title: project.title,
          description: project.description,
          category: project.category as 'long' | 'short',
          tools: project.tools || [],
          videoUrl: project.video_url,
          thumbnail: project.thumbnail,
          status: project.status,
          duration: project.duration,
          tags: project.tags,
          featured: project.featured,
          views: project.views,
          likes: project.likes,
          createdAt: project.created_at,
          updatedAt: project.updated_at,
        }));

        setProjects(mappedProjects);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getProjectsByCategory = (category: 'long' | 'short') => {
    return projects.filter(project => project.category === category);
  };

  return {
    projects,
    loading,
    error,
    getProjectsByCategory,
    longVideos: getProjectsByCategory('long'),
    shortVideos: getProjectsByCategory('short')
  };
};
