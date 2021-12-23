import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { FilmsEffects } from './viewfilms/store/films.effects';
import * as fromViewFilms from './viewfilms/store/films.reducer';
import * as fromAuth from './auth/store/auth.reducer';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { AuthEffects } from './auth/store/auth.effects';
import { FavouritesListComponent } from './users/favouritesList/favouritesList.component';
import { WatchedListComponent } from './users/watchedList/watchedList.component';

@NgModule({
  declarations: [AppComponent, FavouritesListComponent, WatchedListComponent],
  exports: [],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    StoreModule.forRoot({
      films: fromViewFilms.filmsReducer,
      auth: fromAuth.authReducer,
    }),
    EffectsModule.forRoot([FilmsEffects, AuthEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
