import { RenderMode, ServerRoute } from '@angular/ssr';
import { PROJECTS } from './data/projects';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'realisations/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => PROJECTS.map(p => ({ slug: p.slug })),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
