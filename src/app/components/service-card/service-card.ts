import { Component, input } from '@angular/core';
import { Service } from '../../data/services';

@Component({
  selector: 'app-service-card',
  template: `
    <article class="card">
      <h3>{{ service().title }}</h3>
      <p>{{ service().description }}</p>
      @if (!compact()) {
        <ul>
          @for (feature of service().features; track feature) {
            <li>{{ feature }}</li>
          }
        </ul>
      }
    </article>
  `,
  styleUrl: './service-card.scss',
})
export class ServiceCard {
  service = input.required<Service>();
  compact = input(false);
}
