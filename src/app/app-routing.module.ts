import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { FavouritesListComponent } from './users/favouritesList/favouritesList.component';
import { WatchedListComponent } from './users/watchedList/watchedList.component';

const routes: Routes = [
  { path: '', redirectTo: '/films', pathMatch: 'full' },

  {
    path: 'films',
    loadChildren: () =>
      import('./viewfilms/viewfilms.module').then((m) => m.ViewfilmsModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: 'favourites',
    component: FavouritesListComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'watched',
    component: WatchedListComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
