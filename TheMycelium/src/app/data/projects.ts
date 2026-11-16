export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  url?: string;
  year?: number;
  details?: string[];
}

export const PROJECTS: Project[] = [
  {
    slug: 'LVDL',
    title: 'La Voie Du Loup',
    description: 'Site de l\'asso',
    tags: ['Associatif', 'Kung-fu', 'Sport'],
    year: 2026,
    details: ['Oui','Non','Peut-etre'],
  },
  {
    slug: 'SZQD',
    title: 'Sheng Zhi Qi Dao',
    description: 'Site de l\'école',
    tags: ['Associatif', 'Kung-fu', 'Sport'],
  },
  {
    slug: 'Pratiquantc',
    title: 'sjkv',
    description: 'Site du pratiquant',
    tags: ['Associatif', 'Bien-être', 'Mieux-être'],
  },
];