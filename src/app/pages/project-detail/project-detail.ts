import { Component, computed, effect, inject, input } from '@angular/core';
import { PROJECTS } from '../../data/projects';
import { RouterLink } from '@angular/router';
import { Seo } from '../../services/seo';

@Component({
  selector: 'app-project-detail',
  imports: [RouterLink],
  template:`
    <a routerLink="/realisations" class="back">← Toutes les réalisations</a>

    @if (project(); as p){
      <article>
        <h1>{{ p.title }}</h1>
        @if (p.year) {
          <p class="year">{{ p.year }}</p>
        }

        <ul class="tags">
          @for (tag of p.tags; track tag) {
            <li>{{ tag }}</li>
          }
        </ul>

        <p class="lead">{{ p.description }}</p>

        @for (paragraph of p.details ?? []; track $index) {
          <p>{{ paragraph }}</p>
        }

        @if (p.url) {
          <a [href]="p.url" target="_blank" rel="noopener noreferrer" class="btn">Voir le projet</a>
        }
      </article>
    } @else {
      <section class="not-found">
        <h1>Projet introuvable</h1>
        <p>Ce projet n'existe pas ou a été déplacé.</p>
      </section>
    }
  `,
  styleUrl: './project-detail.scss',
})
export class ProjectDetail {
  private seo = inject(Seo);

  slug = input<string>();
  project = computed(() => PROJECTS.find(p => p.slug === this.slug()));

  constructor() {
    effect(() => {
      const p = this.project();
      if (!p) return;
      this.seo.update({
        title: p.title,
        description: p.description,
        path: '/realisations/${p.slug}',
      });
    });
  }
}
