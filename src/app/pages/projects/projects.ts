import { Component, inject } from '@angular/core';
import { PROJECTS } from '../../data/projects';
import { ProjectCard } from '../../components/project-card/project-card';
import { Seo } from '../../services/seo';

@Component({
  selector: 'app-projects',
  imports: [ProjectCard],
  template: `
   <h1>Réalisations</h1>
   <div class="grid">
      @for (project of projects; track project.slug) {
        <app-project-card [project]="project" />
      }
   </div>
    `,
  styleUrl: './projects.scss',
})
export class Projects {
  projects = PROJECTS;

  constructor(){
    inject(Seo).update({
      title: 'Projets',
      description: 'Inspirez-vous de mes créations',
      path: '/projects',
    })
  }
}
