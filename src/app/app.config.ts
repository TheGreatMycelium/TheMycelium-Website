import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()), provideClientHydration(),
  ]
};
export const CONTACT_ENDPOINT = 'https://api.web3forms.com/submit';
export const CONTACT_SAFE = '3b3f45dd-02fd-4bc3-b9df-876e474f89de';