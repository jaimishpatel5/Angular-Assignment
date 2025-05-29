import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
  path: 'movie/:id',
  loadComponent: () => import('./pages/movie-detail/movie-detail.component').then(m => m.MovieDetailComponent)
},
{
  path: 'watchlist',
  loadComponent: () =>
    import('./pages/watchlist.component').then(
      (m) => m.WatchlistComponent
    )
}
];
