import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { concat, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Films } from './films.model';
import * as fromApp from '../store/app.reducer';
import { ViewfilmsService } from './viewfilms.service';
import * as FilmsActions from './store/films.actions';
@Component({
  selector: 'app-viewfilms',
  templateUrl: './viewfilms.component.html',
  styleUrls: ['./viewfilms.component.sass'],
  providers: [ViewfilmsService],
})
export class ViewfilmsComponent implements OnInit, OnDestroy {
  films: Films[];
  subscription: Subscription;
  favouritesList;
  watchedList;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.store.dispatch(FilmsActions.fetchUsersFavourites());

    this.store.dispatch(FilmsActions.fetchUsersWatched());

    this.setFilmFavourites();
    this.setFilmsWatched();

    this.subscription = this.store
      .select('films')
      .pipe(map((filmsState) => filmsState.films))
      .subscribe((films: Films[]) => {
        this.films = films;
      });

    concat(
      this.store
        .select('films')
        .pipe(map((filmState) => filmState.favouriteList))
        .pipe(
          map((favourite) => {
            this.favouritesList = favourite;
          })
        )
    ).subscribe();

    concat(
      this.store
        .select('films')
        .pipe(map((filmState) => filmState.watchedList))
        .pipe(
          map((watched) => {
            this.watchedList = watched;
          })
        )
    ).subscribe();
  }

  popularFilms() {
    this.films = [];
    this.store.dispatch(FilmsActions.FetchPopularFilms());
    this.setFilmFavourites();
    this.setFilmsWatched();
  }

  nowPlayingFilms() {
    this.films = [];
    this.store.dispatch(FilmsActions.FetchNowPlayingFilms());
    this.setFilmFavourites();
    this.setFilmsWatched();
  }

  upcomingFilms() {
    this.films = [];
    this.store.dispatch(FilmsActions.FetchUpcomingFilms());
    this.setFilmFavourites();
    this.setFilmsWatched();
  }

  topRatedFilms() {
    this.films = [];
    this.store.dispatch(FilmsActions.FetchTopRatedFilms());
    this.setFilmFavourites();
    this.setFilmsWatched();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setFilmFavourites() {
    setTimeout(() => {
      if (!this.favouritesList) {
        for (var i = 0; i < 20; i++) {
          this.store.dispatch(
            FilmsActions.RemoveFavouriteFromList({
              filmId: this.films[i].id,
              filmName: this.films[i].original_title,
              favourite: false,
            })
          );
        }
      } else {
        var favValue = Object.keys(this.favouritesList);
        var fav = favValue.toString();
        var fav1 = fav.split(',');
        var arrayofFavs = fav1.map(Number);

        for (var i = 0; i < 20; i++) {
          if (arrayofFavs.includes(this.films[i].id)) {
          } else {
            this.store.dispatch(
              FilmsActions.RemoveFavouriteFromList({
                filmId: this.films[i].id,
                filmName: this.films[i].original_title,
                favourite: false,
              })
            );
          }
        }
      }
    }, 500);
  }

  setFilmsWatched() {
    setTimeout(() => {
      if (!this.watchedList) {
        for (var i = 0; i < 20; i++) {
          this.store.dispatch(
            FilmsActions.RemoveWatchedFromList({
              filmId: this.films[i].id,
              filmName: this.films[i].original_title,
              watched: 'false',
            })
          );
        }
      } else {
        var watchValue = Object.keys(this.watchedList);
        var watch = watchValue.toString();
        var watched = watch.split(',');
        var arrayofWatched = watched.map(Number);

        for (var i = 0; i < 20; i++) {
          if (arrayofWatched.includes(this.films[i].id)) {
          } else {
            this.store.dispatch(
              FilmsActions.RemoveWatchedFromList({
                filmId: this.films[i].id,
                filmName: this.films[i].original_title,
                watched: 'false',
              })
            );
          }
        }
      }
    }, 2000);
  }
}
