import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'links',
    pathMatch: 'full'
  },
  {
    path: 'links',
    loadComponent: () =>
      import('./features/links/list/list').then(m => m.ListComponent)
  },{
  path: 'links/add',
  loadComponent: () =>
    import('./features/links/add/add').then(m => m.AddComponent)
}

];
