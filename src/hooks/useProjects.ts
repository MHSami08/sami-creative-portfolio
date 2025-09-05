import { useState, useEffect } from 'react';
import { ProjectManager, VideoProject } from '@/utils/projectManager';

export const useProjects = () => {
  const [projects, setProjects] = useState<VideoProject[]>([]);
  const [loading, setLoading] = useState(true);
  const projectManager = ProjectManager.getInstance();

  useEffect(() => {
    // Initial load
    setProjects(projectManager.getAllProjects());
    setLoading(false);

    // Subscribe to changes
    const unsubscribe = projectManager.subscribe((updatedProjects) => {
      setProjects(updatedProjects);
    });

    return unsubscribe;
  }, [projectManager]);

  const addProject = (projectData: Omit<VideoProject, 'id' | 'createdAt' | 'updatedAt'>) => {
    return projectManager.addProject(projectData);
  };

  const updateProject = (id: number, updates: Partial<VideoProject>) => {
    return projectManager.updateProject(id, updates);
  };

  const deleteProject = (id: number) => {
    return projectManager.deleteProject(id);
  };

  const getProjectsByCategory = (category: 'long' | 'short') => {
    return projects.filter(project => project.category === category);
  };

  return {
    projects,
    loading,
    addProject,
    updateProject,
    deleteProject,
    getProjectsByCategory,
    longVideos: getProjectsByCategory('long'),
    shortVideos: getProjectsByCategory('short')
  };
};