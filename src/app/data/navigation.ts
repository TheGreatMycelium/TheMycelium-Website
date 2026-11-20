import navJson from './navigation.json';

export interface NavLink { path: string; label: string; }

export const NAV_LINKS: NavLink[] = navJson;