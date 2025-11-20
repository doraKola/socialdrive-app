import { Routes } from '@angular/router';
import { ListComponent } from './features/links/list/list';

export const routes: Routes = [
  { path: '', redirectTo: 'links', pathMatch: 'full' },
  { path: 'links', component: ListComponent },
  { path: 'links/add', loadComponent: () => import('./features/links/add/add').then(m => m.Add) },
];
