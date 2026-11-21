import { afterNextRender, Component, DestroyRef, ElementRef, inject, viewChild } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ProjectCard } from "../../components/project-card/project-card";
import { SERVICES } from "../../data/services";
import { PROJECTS } from "../../data/projects";
import { Seo } from "../../services/seo";

const SCROLL_RANGE = 400;

@Component({
  selector: 'app-home',
  imports: [RouterLink, ProjectCard],
  template: `
    <section class="hero" #hero>
      <h1>Développeur Web et Webmaster</h1>
      <p>Rejoignez le Mycélium. Travaillez l'esprit tranquille.</p>
      <div class="actions">
        <a routerLink="/contact" class="btn">Me contacter</a>
        <a routerLink="/realisations" class="btn btn-outline">Voir mes réalisations</a>
      </div>
      <span class="scroll-hint" aria-hidden="true">↓↓↓</span>
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

  private hero = viewChild.required<ElementRef<HTMLElement>>('hero');

  constructor(){
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const el = this.hero().nativeElement;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.style.setProperty('--progress', '1');
        return;
      }

      let frame = 0;

      const update = () => {
        const progress = Math.min(Math.max(window.scrollY / SCROLL_RANGE, 0), 1);
        el.style.setProperty('--progress', String(progress));
        frame = 0;
      };

      const onScroll = () => {
        if (!frame) frame = requestAnimationFrame(update);
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      update();

      destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', onScroll);
        cancelAnimationFrame(frame);
      });
    });

    inject(Seo).update({
      title: 'Bienvenu',
      description: 'Un projet, une expansion, un renouveau? Je vous aide à concrétiser votre présence en ligne',
      path: '',
    });
  }
}
