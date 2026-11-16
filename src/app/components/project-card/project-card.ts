import { Component, input } from '@angular/core';
import { Project } from '../../data/projects';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-project-card',
  imports: [RouterLink],
  template: `
    <article class="card">
      <h3><a [routerLink]="['/realisations', project().slug]">{{ project().title }}</a></h3>
      <p>{{ project().description }}</p>
      <ul class="tags">
        @for (tag of project().tags; track tag) {
          <li>{{ tag }}</li>
        }
      </ul>
      @if (project().url) {
        <a [href]="project().url" target="_blank" rel="noopener">Voir le projet</a>
      }
    </article>
  `,
  styleUrl: './project-card.scss',
})
export class ProjectCard {
  project = input.required<Project>();
}
