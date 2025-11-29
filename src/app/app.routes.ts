import { Routes } from '@angular/router';
import { authGuard } from '../app/core/guards/auth.guard';
import { LoginComponent } from '../app/features/auth/login/login.component';
import { RegisterComponent } from '../app/features/auth/register/register.component';

export const routes: Routes = [

  // ---- AUTH PAGES ----
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

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
