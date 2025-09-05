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
    try {
      return projectManager.addProject(projectData);
    } catch (error) {
      console.error('Add project error:', error);
      throw error;
    }
  };

  const updateProject = (id: number, updates: Partial<VideoProject>) => {
    try {
      return projectManager.updateProject(id, updates);
    } catch (error) {
      console.error('Update project error:', error);
      throw error;
    }
  };

  const deleteProject = (id: number) => {
    try {
      return projectManager.deleteProject(id);
    } catch (error) {
      console.error('Delete project error:', error);
      return false;
    }
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