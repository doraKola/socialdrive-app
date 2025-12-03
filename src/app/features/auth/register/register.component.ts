import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [FormsModule, NgIf]
})
export class RegisterComponent {

  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  // --------------------------------------------
  // Detect browser language (simple & accurate)
  // --------------------------------------------
  private getBrowserLanguage(): string {
    const lang = navigator.language || navigator.languages?.[0] || 'en';
    return lang.split('-')[0].toLowerCase(); // "en-US" → "en"
  }

  // --------------------------------------------
  // Register user + send detectedLanguage to API
  // --------------------------------------------
  register() {
    const detectedLanguage = this.getBrowserLanguage();

    this.auth.register(this.email, this.password, detectedLanguage)
      .subscribe({
        next: () => this.router.navigate(['/drive']),
        error: () => this.error = 'User already exists'
      });
  }
}
