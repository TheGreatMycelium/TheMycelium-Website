import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ProjectCard } from "../../components/project-card/project-card";
import { SERVICES } from "../../data/services";
import { PROJECTS } from "../../data/projects";
import { Seo } from "../../services/seo";

@Component({
  selector: 'app-home',
  imports: [RouterLink, ProjectCard],
  template: `
    <section class="hero">
      <h1>Développeur Web et Webmaster</h1>
      <p>Je conçois des sites rapides, sur mesure et faciles à faire évoluer.</p>
      <div class="actions">
        <a routerLink="/contact" class="btn">Me contacter</a>
        <a routerLink="/realisations" class="btn btn-outline">Voir mes réalisations</a>
      </div>
    </section>

    <section>
      <h2>Services</h2>
      <div class="grid">
        @for (service of services; track service.title) {
          <article class="service">
            <h3>{{ service.title }}</h3>
            <p>{{ service.description }}</p>
          </article>
        }
      </div>
    </section>

    <section>
      <h2>Dernières réalisations</h2>
      <div class="grid">
        @for (project of latestProjects; track project.slug) {
          <app-project-card [project]="project" />
        }
      </div>
      <a routerLink="realisations" class="more">Toutes les réalisations →</a>
    </section>
  `,
  styleUrl: './home.scss',
})
export class Home {
  services = SERVICES;
  latestProjects = PROJECTS.slice(0,3);

  constructor(){
    inject(Seo).update({
      title: 'Bienvenu',
      description: 'Un projet, une expansion, un renouveau? Je vous aide à concrétiser votre présence en ligne',
      path: '',
    })
  }
}
