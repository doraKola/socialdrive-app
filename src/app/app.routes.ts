import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'hub',
    loadComponent: () =>
      import('./features/drive/hub').then((m) => m.Hub),
  },
  { path: '', pathMatch: 'full', redirectTo: 'hub' },
  { path: '**', redirectTo: 'hub' },
];
