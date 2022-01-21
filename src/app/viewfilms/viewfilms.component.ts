import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { concat } from 'rxjs';
import { map } from 'rxjs/operators';
import { Films } from './films.model';
import * as fromApp from '../store/app.reducer';
import * as FilmsActions from './store/films.actions';
@Component({
  selector: 'app-viewfilms',
  templateUrl: './viewfilms.component.html',
  styleUrls: ['./viewfilms.component.sass'],
})
export class ViewfilmsComponent implements OnInit {
  public films: Films[];
  private _favouritesList;
  private _watchedList;
  private _isLoggedIn: boolean = false;
  constructor(private _store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this._store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        this._isLoggedIn = !!user;
        if (this._isLoggedIn === false) {
        } else {
          this._store.dispatch(FilmsActions.fetchUsersFavourites());
          this._store.dispatch(FilmsActions.fetchUsersWatched());
          this.setFilmFavourites();
          this.setFilmsWatched();
        }
      });

    this._store
      .select('films')
      .pipe(map((filmsState) => filmsState.films))
      .subscribe((films: Films[]) => {
        this.films = films;
      });

    concat(
      this._store
        .select('films')
        .pipe(map((filmState) => filmState.favouriteList))
        .pipe(
          map((favourite) => {
            this._favouritesList = favourite;
          })
        )
    ).subscribe();

    concat(
      this._store
        .select('films')
        .pipe(map((filmState) => filmState.watchedList))
        .pipe(
          map((watched) => {
            this._watchedList = watched;
          })
        )
    ).subscribe();
  }

  public popularFilms() {
    this.films = [];
    this._store.dispatch(FilmsActions.FetchPopularFilms());
    this.setFilmFavourites();
    this.setFilmsWatched();
  }

  public nowPlayingFilms() {
    this.films = [];
    this._store.dispatch(FilmsActions.FetchNowPlayingFilms());
    this.setFilmFavourites();
    this.setFilmsWatched();
  }

  public upcomingFilms() {
    this.films = [];
    this._store.dispatch(FilmsActions.FetchUpcomingFilms());
    this.setFilmFavourites();
    this.setFilmsWatched();
  }

  public topRatedFilms() {
    this.films = [];
    this._store.dispatch(FilmsActions.FetchTopRatedFilms());
    this.setFilmFavourites();
    this.setFilmsWatched();
  }

  private setFilmFavourites() {
    setTimeout(() => {
      if (!this._favouritesList) {
        for (var i = 0; i < 20; i++) {
          this._store.dispatch(
            FilmsActions.RemoveFavouriteFromList({
              filmId: this.films[i].id,
              filmName: this.films[i].original_title,
              favourite: false,
            })
          );
        }
      } else {
        var favValue = Object.keys(this._favouritesList);
        var fav = favValue.toString();
        var fav1 = fav.split(',');
        var arrayofFavs = fav1.map(Number);

        for (var i = 0; i < 20; i++) {
          if (arrayofFavs.includes(this.films[i].id)) {
          } else {
            this._store.dispatch(
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

  private setFilmsWatched() {
    setTimeout(() => {
      if (!this._watchedList) {
        for (var i = 0; i < 20; i++) {
          this._store.dispatch(
            FilmsActions.RemoveWatchedFromList({
              filmId: this.films[i].id,
              filmName: this.films[i].original_title,
              watched: 'false',
            })
          );
        }
      } else {
        var watchValue = Object.keys(this._watchedList);
        var watch = watchValue.toString();
        var watched = watch.split(',');
        var arrayofWatched = watched.map(Number);

        for (var i = 0; i < 20; i++) {
          if (arrayofWatched.includes(this.films[i].id)) {
          } else {
            this._store.dispatch(
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
