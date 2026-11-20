import aboutJson from './about.json'

export interface SkillGroup {
    category: string;
    skills: string[];
}

export interface AboutContent {
    intro: string[];
    skillGroups: SkillGroup[];
}

export const ABOUT: AboutContent = aboutJson;
