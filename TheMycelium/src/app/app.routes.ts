import { Routes } from '@angular/router';
import { PROJECTS } from './data/projects';

export const routes: Routes = [
    { path: '', 
        title: 'Accueil', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
    { path: 'services', 
        title: 'Services', loadComponent: () => import('./pages/services/services').then(m => m.Services) },
    { path: 'realisations', 
        title: 'Réalisations', loadComponent: () => import('./pages/projects/projects').then(m => m.Projects) },
    { path: 'a-propos', 
        title: 'À propos', loadComponent: () => import('./pages/about/about').then(m => m.About) },
    { path: 'contact', 
        title: 'Contact', loadComponent: () => import('./pages/contact/contact').then(m => m.Contact) },
    { path: 'realisations/:slug', 
        title: route => PROJECTS.find(p => p.slug === route.paramMap.get('slug'))?.title ?? 'Projet introuvable', 
        loadComponent: () => import('./pages/project-detail/project-detail').then(m => m.ProjectDetail), },
    { path: '**', 
        redirectTo: ''}
];
