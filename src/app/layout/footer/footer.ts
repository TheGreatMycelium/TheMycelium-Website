import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../../data/data';
import { NAV_LINKS } from '../../data/navigation';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template:`
    <footer class="footer">
      <div class="inner">
        <div class="brand">
          <strong>{{ site.name }}</strong>
          <p>{{ site.tagline }}</p>
        </div>

        <nav aria-label="Navigation du pied de page">
          @for (link of links; track link.path) {
            <a [routerLink]="link.path">{{ link.label }}</a>
          }
        </nav>

        <ul class="socials">
          @for (social of site.socials; track social.url) {
            <li>
              <a [href]="social.url" target="_blank" rel="noopener noreferrer">{{ social.label }}</a>
            </li>
          }
        </ul>
      </div>

      <p class="legal">© {{ year }} {{ site.name }}. Tous droits réservés.</p>
    </footer>
  `,
  styleUrl: './footer.scss',
})
export class Footer {
  site = SITE;
  links = NAV_LINKS;
  year = new Date().getFullYear();
}
