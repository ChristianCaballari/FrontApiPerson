import { Routes } from '@angular/router';

export const routes: Routes = [
   { path: 'main', loadComponent: () => import('./main/main.page').then(m => m.MainPage)},
  {
    path: 'crear',
    loadComponent: () => import('./crear/crear.page').then( m => m.CrearPage)
  },
  {
    path: 'editar/:id',
    loadComponent: () => import('./editar/editar.page').then( m => m.EditarPage)
  }
];
