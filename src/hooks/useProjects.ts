import { useState, useEffect } from 'react';
import { fetchProjects } from '@/lib/supabaseClient';
import { seedDatabaseIfEmpty } from '@/utils/seedDatabase';

// Map database fields to component expected format
const mapDbProject = (dbProject: any) => ({
  id: dbProject.id,
  title: dbProject.title,
  description: dbProject.description,
  category: dbProject.category,
  status: dbProject.status === 'published' ? 'completed' : dbProject.status,
  tools: dbProject.tools || [],
  duration: dbProject.duration || '',
  type: dbProject.category === 'long' ? 'Long Video' : 'Shorts',
  videoUrl: dbProject.video_url,
  thumbnail: dbProject.thumbnail || '',
  detailedDescription: dbProject.description,
  features: dbProject.tags || [],
  createdAt: dbProject.created_at,
  updatedAt: dbProject.updated_at
});

export const useProjects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      
      // Seed database if empty
      await seedDatabaseIfEmpty();
      
      // Fetch projects
      const data = await fetchProjects();
      const mappedProjects = data.map(mapDbProject);
      setProjects(mappedProjects);
      setLoading(false);
    };

    loadProjects();
  }, []);

  const longVideos = projects.filter(p => p.category === 'long');
  const shortVideos = projects.filter(p => p.category === 'short');

  return {
    projects,
    loading,
    longVideos,
    shortVideos,
  };
};