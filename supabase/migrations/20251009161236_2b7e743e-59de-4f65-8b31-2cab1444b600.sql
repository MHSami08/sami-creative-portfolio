-- Create video projects table
CREATE TABLE public.video_projects (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('long', 'short')),
  tools TEXT[] NOT NULL DEFAULT '{}',
  video_url TEXT NOT NULL,
  thumbnail TEXT,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  views INTEGER NOT NULL DEFAULT 0,
  likes INTEGER NOT NULL DEFAULT 0,
  duration TEXT,
  tags TEXT[] DEFAULT '{}',
  client_name TEXT,
  project_date DATE,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.video_projects ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (everyone can view projects)
CREATE POLICY "Anyone can view published projects"
ON public.video_projects
FOR SELECT
USING (status = 'published');

-- Create index for better performance
CREATE INDEX idx_video_projects_category ON public.video_projects(category);
CREATE INDEX idx_video_projects_status ON public.video_projects(status);
CREATE INDEX idx_video_projects_featured ON public.video_projects(featured);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_video_projects_updated_at
BEFORE UPDATE ON public.video_projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();