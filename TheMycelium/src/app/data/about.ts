export interface SkillGroup {
    category: string;
    skills: string[];
}

export const ABOUT = {
    intro: [
        'Je suis développeur web et webmaster, spécialisé dans la création de sites sur mesure.',
        'Je mets en avant l\'aspect structurel de mes sites, de sortes à garantir une évolution et une maintenance cohérente avec l\'activité de mes clients.'
    ],
    skillGroups: [
        { category: 'Front-end', skills: ['Angular', 'Typescript', 'HTML', 'SCSS'] },
        { category: 'Outils', skills: ['Git', 'Node.js', 'Netlify'] },
        { category: 'Création de sites', skills: ['Wix', 'SEO', 'Accessibilité'] },
    ] as SkillGroup[],
};
