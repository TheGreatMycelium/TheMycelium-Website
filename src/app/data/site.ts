import siteJson from './site.json';

export interface Social { label: string; url: string };
export interface Site { name: string; url: string; tagline: string; socials: Social[] };

export const SITE: Site = siteJson;