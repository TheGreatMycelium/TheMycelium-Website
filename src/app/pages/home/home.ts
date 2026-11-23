import { afterNextRender, Component, DestroyRef, ElementRef, inject, viewChild } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ProjectCard } from "../../components/project-card/project-card";
import { SERVICES } from "../../data/services";
import { PROJECTS } from "../../data/projects";
import { Seo } from "../../services/seo";

const SCROLL_RANGE = 600;

@Component({
  selector: 'app-home',
  imports: [RouterLink, ProjectCard],
  template: `
    <section class="hero" #hero>
      <img src="/the_mycelium_logo_round_web.svg" alt="" />
      <h1>Développeur Web et Webmaster</h1>
      <p>Rejoins le Mycélium. Travailles l'esprit tranquille.</p>
        <!--
      <div class="actions">
        <a routerLink="/realisations" class="btn btn-outline">Un projet? Parlons en ⇾</a>
      </div>
      -->
    </section>

    <section>
      <div class="services">
        @for (service of services; track service.title) {
          <article class="grid">
            @if (!service.pair) {
              <h3>{{ service.besoin }}</h3>
              <img src="{{ service.imageUrl }}" alt="Illustration Site Vitrine">
            }
            @else {
              <img src="{{ service.imageUrl }}" alt="Illustration Site Vitrine">
              <h3>{{ service.besoin }}</h3>      
            }
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
