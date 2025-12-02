import { Routes } from '@angular/router';
import { authGuard } from '../app/core/guards/auth.guard';
import { LoginComponent } from '../app/features/auth/login/login.component';
import { RegisterComponent } from '../app/features/auth/register/register.component';
import { ForgotPasswordComponent } from '../app/features/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from  '../app/features/auth/reset-password/reset-password.component';
import { TranslationSettingsComponent } from '../app/features/settings/translation-settings.component';

export const routes: Routes = [

  // ---- AUTH PAGES ----
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'settings/languages', component: TranslationSettingsComponent },

  // ---- PROTECTED APP ----
  {
    path: 'hub',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/drive/hub').then((m) => m.Hub),
  },

  // ---- DEFAULT ROUTES ----
  { path: '', pathMatch: 'full', redirectTo: 'hub' },
  { path: '**', redirectTo: 'hub' },
];
