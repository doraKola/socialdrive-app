import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'drive',
    loadComponent: () =>
      import('./features/drive/drive').then((m) => m.Drive),
  },
  { path: '', pathMatch: 'full', redirectTo: 'drive' },
  { path: '**', redirectTo: 'drive' },
];
