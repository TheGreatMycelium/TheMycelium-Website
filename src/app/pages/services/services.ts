import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SERVICES } from '../../data/services';
import { ServiceCard } from '../../components/service-card/service-card';
import { Seo } from '../../services/seo';

@Component({
  selector: 'app-services',
  imports: [RouterLink, ServiceCard],
  template: `
    <div class="intro">
      <h1>Services</h1>
      <p>
        Un site entier, ou seulement quelques retouches?
      </p>
    </div>

    <div class="grid">
      @for (service of services; track service.title) {
        <app-service-card [service]="service" />
      }
    </div>

    <section class="process">
      <h2>Comment je travaille</h2>
      <ol>
        @for (step of steps; track step.title) {
          <li>
            <h3>{{ step.title }}</h3>
            <p>{{ step.text }}</p>
          </li>
        }
      </ol>
    </section>

    <section class="cta">
      <h2>Un projet en tête ?</h2>
      <p>Parlons-en : Je vous réponds rapidement.</p>
      <a routerLink="/contact" class="btn">Me contacter</a>
    </section>
  `,
  styleUrl: './services.scss',
})

export class Services {
  services = SERVICES;

  steps = [
    { title: 'Échange', text: 'On définit ensemble vos besoins, vos objectifs et votre budget.' },
    { title: 'Conception', text: 'Je propose une maquette et une structure adaptées à votre activité.' },
    { title: 'Réalisation', text: 'Je développe le site, avec des points d\'étape réguliers.' },
    { title: 'Mise en ligne', text: 'Je déploie le site, je configure le domaine et je vous accompagne ensuite.' },
  ];
  
  constructor(){
    inject(Seo).update({
      title: 'Services',
      description: 'Création de sites et Webmastering',
      path: '/services',
    })
  }
}
