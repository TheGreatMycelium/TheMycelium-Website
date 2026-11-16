import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NAV_LINKS } from '../../data/navigation';
import { SITE } from '../../data/data';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <a routerLink="/" class="logo">{{ siteName }}</a>
      <nav>
        @for (link of links; track link.path) {
          <a [routerLink]="link.path" routerLinkActive="active" 
          [routerLinkActiveOptions]="{ exact: link.path === '/' }">{{ link.label }}</a>
        }
      </nav>
    </header>
    `,
  styleUrl: './header.scss',
})
export class Header {
  links = NAV_LINKS;
  siteName = SITE.name;
}
