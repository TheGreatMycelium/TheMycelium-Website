import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CONTACT_ENDPOINT, CONTACT_SAFE } from '../../app.config';
import { Seo } from '../../services/seo';

type Status = 'idle' | 'sending' | 'success' | 'error';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  template: `
    <p class="intro">Un projet, une question? Écris-moi, je réponds rapidement.</p>

    <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
      <div class="field">
        <label for="name">Nom</label>
        <input id="name" type="text" formControlName="name" autocomplete="name" 
          [attr.aria-invalid]="isInvalid('name')" />
        @if (isInvalid('name')) {
          <small class="error">Merci d'indiquer ton nom.</small>
        }
      </div>
      
      <div class="field">
        <label for="email">E-mail</label>
        <input id="email" type="email" formControlName="email" autocomplete="email"
          [attr.aria-invalid]="isInvalid('email')" />
        @if (isInvalid('email')) {
          <small class="error">Merci d'indiquer une adresse email valide.</small>
        }
      </div>

      <div class="field">
        <label for="message">Message</label>
        <textarea id="message" rows="6" formControlName="Message"
          [attr.aria-invalid]="isInvalid('Message')"></textarea>
        @if (isInvalid('Message')) {
          <small class="error">Ton message doit contenir au moins 10 caractères.</small>
        }
      </div>

      <!-- Honeypot -->
      <div class="hp" aria-hidden="true">
        <label for="website">Ne pas remplir</label>
        <input id="website" type="text" formControlName="website" tabindex="-1" autocomplete="off" />
      </div>

      <button class="btn" type="submit" [disabled]="status() === 'sending'">
        {{ status() === 'sending' ? 'Envoi en cours...' : 'Envoyer' }}
      </button>

      <div aria-live="polite">
        @if (status() === 'success') {
          <p class="feedback success">Merci, ton message a bien été envoyé !</p>
        }
        @if (status() === 'error') {
          <p class="feedback failure">
            Une erreur est survenu. Réessaie ou écris-moi directement par e-mail.
          </p>
        }
      </div>
    </form>
  `,
  styleUrl: './contact.scss',
})
export class Contact {
  private fb = inject(FormBuilder).nonNullable;
  private http = inject(HttpClient);

  status = signal<Status>('idle');

  form = this.fb.group({
    access_key: [CONTACT_SAFE],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    Message: ['', [Validators.required, Validators.minLength(10)]],
    website: [''],
  });

  isInvalid(field: 'name' | 'email' | 'Message'): boolean {
    const control = this.form.controls[field];
    return control.invalid && control.touched;
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { website, ...data } = this.form.getRawValue();

    if (website) {
      this.status.set('success');
      return;
    }

    this.status.set('sending');
    this.http
      .post(CONTACT_ENDPOINT, data, { headers: { Accept: 'application/json'}})
      .subscribe({
        next: () => {
          this.status.set('success');
          this.form.reset();
        },
        error: () => this.status.set('error'),
    });
  }
  constructor(){
    inject(Seo).update({
      title: 'Contact',
      description: 'Prendre contact avec moi',
      path: '/contact',
    })
  }
}
