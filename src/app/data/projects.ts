import projectsJson from './projects.json';

export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  url?: string;
  year?: number;
  details?: string[];
}

export const PROJECTS: Project[] = projectsJson;