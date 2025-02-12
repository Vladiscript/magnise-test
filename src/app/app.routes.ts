import {Routes} from '@angular/router'
import {authGuard} from './core/auth.guard'

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(c => c.HomeComponent),
    canActivate: [authGuard]
  }
]
