import { Component, DOCUMENT, effect, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NAV_LINKS } from '../../data/navigation';
import { SITE } from '../../data/site';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  host: { '(keydown.escape)': 'close()' },
  template: `
    <header class="header">
      <a routerLink="/" class="logo" (click)="close()">{{ siteName }}</a>
      
      <button 
        class="menu-toggle"
        type="button"
        aria-label="Menu"
        aria-controls="main-nav"
        [attr.aria-expanded]="open()"
        [class.open]="open()"
        (click)="toggle()"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav id="main-nav" aria-label="Navigation principale" [class.open]="open()">
        @for (link of links; track link.path) {
          <a
            [routerLink]="link.path" 
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: link.path === '/' }"
            (click)="close()"
          >{{ link.label }}</a>
        }
      </nav>
    </header>
    `,
  styleUrl: './header.scss',
})
export class Header {
  links = NAV_LINKS;
  siteName = SITE.name;
  private doc = inject(DOCUMENT);

  open = signal(false);

  toggle() { this.open.update(value => !value); }
  close() { this.open.set(false); }
  constructor() {
    effect(() => {
      this.doc.body.style.overflow = this.open() ? 'hidden' : '';
    });
  }
}
