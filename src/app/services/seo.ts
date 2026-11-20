import { DOCUMENT, inject, Injectable } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { SITE } from "../data/site";

export interface SeoConfig {
    title: string;
    description: string;
    path: string;
    image?: string;
}

@Injectable({ providedIn: 'root' })
export class Seo {
    private meta = inject(Meta);
    private doc = inject(DOCUMENT);

    update({ title, description, path, image = '/og-image.jpg' }: SeoConfig) {
        const url = SITE.url + path;
        const imageUrl = SITE.url + image;

        this.meta.updateTag({ name: 'description', content: description });

        this.meta.updateTag({ property: 'og:type', content: 'website' });
        this.meta.updateTag({ property: 'og:title', content: title });
        this.meta.updateTag({ property: 'og:description', content: description });
        this.meta.updateTag({ property: 'og:url', content: url });
        this.meta.updateTag({ property: 'og:image', content: imageUrl });

        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });

        this.setCanonical(url);
    }

    private setCanonical(url: string) {
        let link = this.doc.querySelector<HTMLLinkElement>('link[rel="canonical"]');
        if (!link) {
            link = this.doc.createElement('link');
            link.setAttribute('rel', 'canonical');
            this.doc.head.appendChild(link);
        }
        link.setAttribute('href', url);
    }
}
