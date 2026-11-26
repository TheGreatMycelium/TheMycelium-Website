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
          <article class="flex">
            @if (!service.pair) {
              <div class="service">
                <h3>{{ service.besoin }}</h3>
                <ul>
                  @for (feature of service.features; track feature){
                    <li>{{ feature }}</li>
                  }
                </ul>
              </div>
              <img src="{{ service.imageUrl }}" alt="Illustration Site Vitrine">
            }
            @else {
              <img src="{{ service.imageUrl }}" alt="Illustration Site Vitrine">
              <div class="service">
                <h3>{{ service.besoin }}</h3>
                <ul>
                  @for (feature of service.features; track feature){
                    <li>{{ feature }}</li>
                  }
                </ul>
              </div> 
            }
          </article>
        }
      </div>
    </section>

    <section>
      <div class="why">
        <h3>Un site Web en 2027, encore pertinent?</h3>
        <ul>
          <li>
            <p>
              Un site Web, c'est une visibilité instantanné.
              Une porte ouverte sur votre activité, 
              sur votre quotidien et votre manière de travailler, 
              c'est un moyen très rapide de vous faire connaitre. 
              Vous êtes seul maitre à bord, 
              laissez votre créativité s'exprimer et résonner chez les autres.
            </p>
          </li>
          <li>
            <p>
              Un site web, c'est aussi un argument de stabilité.
              Toute grande enseigne, toute entreprise serieuse possède un site web, 
              c'est un outil rassurant pour le client ou le patient, 
              encore plus aujourd'hui où la création de site web est devenue
              beaucoup plus simple et accessible qu'avant
            </p>
          </li>
          <li>
            <p>
              Un site web, c'est aussi un endroit ou vous pouvez vous permettre 
              d'aller plus loin, 
              de proposer des explications plus poussées, des tests, 
              des reflexions, des jeux interactifs, 
              des expériences pour mettre en avant votre activité, 
              vos talents et vos créations.
            </p>
          </li>
          <li>
            <p>
              Un site, c'est aussi une valeure sur dans le monde de l'IA.
              Les gens ne cherchent plus sur google, il demande à ChatGPT,
              et les réponses qu'il donnera seront directement liées à votre présence en ligne, 
              aux commentaires des gens, aux mentions qui sont faites de vous et 
              à la solidité de votre image sur le web.
            </p>
          </li>
        </ul>
      </div>
    </section>

    <section>
      <h3>Les dernières créations du Mycélium</h3>
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
