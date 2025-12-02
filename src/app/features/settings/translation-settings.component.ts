import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-translation-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './translation-settings.component.html',
  styleUrls: ['./translation-settings.component.scss']
})
export class TranslationSettingsComponent implements OnInit {

  availableLanguages = [
    { code: 'en', label: 'English' },
    { code: 'he', label: 'Hebrew' },
    { code: 'es', label: 'Spanish' },
    { code: 'fr', label: 'French' },
    { code: 'de', label: 'German' },
    { code: 'it', label: 'Italian' }
  ];

  allowedLanguages: string[] = [];
  uiLanguage = 'he';
  planLimit = 5;
  message = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUserTranslationSettings();
  }

  loadUserTranslationSettings() {
    this.userService.getTranslationSettings().subscribe({
      next: (res) => {
        this.allowedLanguages = res.allowedLanguages || [];
        this.uiLanguage = res.uiLanguage || 'en';
        this.planLimit = res.planLimit || 1;
      }
    });
  }

  toggleLanguage(code: string) {
    const exists = this.allowedLanguages.includes(code);

    if (!exists) {
      if (this.allowedLanguages.length >= this.planLimit) {
        this.message = `Your plan allows only ${this.planLimit} languages.`;
        return;
      }
      this.allowedLanguages.push(code);
    } else {
      this.allowedLanguages = this.allowedLanguages.filter(x => x !== code);
    }
  }

  save() {
    this.userService.updateLanguages({
      languages: this.allowedLanguages,
      defaultLanguage: this.uiLanguage
    })
    .subscribe({
      next: () => this.message = 'Settings saved!',
      error: err => this.message = err.error || 'Error saving settings'
    });
  }
  
  close() {
  this.router.navigate(['/drive']);
  }
}
