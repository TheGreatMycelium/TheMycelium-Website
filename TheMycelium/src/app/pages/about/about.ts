import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ABOUT } from '../../data/about';
import { Seo } from '../../services/seo';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  template:`
    <h1>À propos</h1>

    <section class="intro">
      @for (paragraph of about.intro; track $index) {
        <p>{{ paragraph }}</p>
      }
    </section>

    <section>
      <h2>Compétences</h2>
      <div class="groups">
        @for (group of about.skillGroups; track group.category) {
          <div class="group">
            <h3>{{ group.category }}</h3>
            <ul>
              @for (skill of group.skills; track skill) {
                <li>{{ skill }}</li>
              }
            </ul>
          </div>
        }
      </div>
    </section>

    <section class="cta">
      <h2>Vous avez un projet?</h2>
      <a routerLink="/contact" class="btn">Me contacter</a>
    </section>
  `,
  styleUrl: './about.scss',
})
export class About {
  about = ABOUT;
  constructor(){
    inject(Seo).update({
      title: 'À propos',
      description: 'Qui je suis et d\'où je viens',
      path: '/a-propos',
    })
  }
}
