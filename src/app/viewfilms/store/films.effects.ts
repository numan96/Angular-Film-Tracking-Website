import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { mergeMap } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import { MovieData } from '../data.model';
import { Films } from '../films.model';
import * as FilmsActions from '../store/films.actions';

@Injectable()
export class FilmsEffects {
  private _webUrl = 'https://image.tmdb.org/t/p/w500';
  private _value1: number;

  fetchPopularFilms$ = createEffect(() =>
    this._actions$.pipe(
      ofType(FilmsActions.FetchPopularFilms),
      withLatestFrom(this._store.select('films')),
      switchMap((filterFilm) => {
        return this._http
          .get<Films[]>(
            'https://api.themoviedb.org/3/movie/popular?api_key=3bf7fc56ee01b081668e7df85a3d2155&language=en-US&page=1'
          )
          .pipe(
            map((data) =>
              data['results'].map((obj) => {
                return {
                  original_title: obj.original_title,
                  id: obj.id,
                  genres: obj.genre_ids,
                  overview: obj.overview,
                  popularity: obj.popularity,
                  release_date: obj.release_date,
                  poster_path: this._webUrl.concat('', obj.poster_path),
                  vote_average: obj.vote_average * 10,
                  favourited: false,
                };
              })
            )
          );
      }),
      map((films) => {
        return FilmsActions.SetFilms({ films });
      })
    )
  );

  fetchNowPlayingFilms$ = createEffect(() =>
    this._actions$.pipe(
      ofType(FilmsActions.FetchNowPlayingFilms),
      withLatestFrom(this._store.select('films')),
      switchMap((filterFilm) => {
        return this._http
          .get<Films[]>(
            'https://api.themoviedb.org/3/movie/now_playing?api_key=3bf7fc56ee01b081668e7df85a3d2155&language=en-US&page=1'
          )
          .pipe(
            map((data) =>
              data['results'].map((obj) => {
                return {
                  original_title: obj.original_title,
                  id: obj.id,
                  genres: obj.genre_ids,
                  overview: obj.overview,
                  popularity: obj.popularity,
                  release_date: obj.release_date,
                  poster_path: this._webUrl.concat('', obj.poster_path),
                  vote_average: obj.vote_average * 10,
                  favourited: false,
                };
              })
            )
          );
      }),
      map((films) => {
        return FilmsActions.SetFilms({ films });
      })
    )
  );

  fetchUpcomingFilms$ = createEffect(() =>
    this._actions$.pipe(
      ofType(FilmsActions.FetchUpcomingFilms),
      withLatestFrom(this._store.select('films')),
      switchMap((filterFilm) => {
        return this._http
          .get<Films[]>(
            'https://api.themoviedb.org/3/movie/upcoming?api_key=3bf7fc56ee01b081668e7df85a3d2155&language=en-US&page=1'
          )
          .pipe(
            map((data) =>
              data['results'].map((obj) => {
                return {
                  original_title: obj.original_title,
                  id: obj.id,
                  genres: obj.genre_ids,
                  overview: obj.overview,
                  popularity: obj.popularity,
                  release_date: obj.release_date,
                  poster_path: this._webUrl.concat('', obj.poster_path),
                  vote_average: obj.vote_average * 10,
                  favourited: false,
                };
              })
            )
          );
      }),
      map((films) => {
        return FilmsActions.SetFilms({ films });
      })
    )
  );

  fetchTopRatedFilms$ = createEffect(() =>
    this._actions$.pipe(
      ofType(FilmsActions.FetchTopRatedFilms),
      withLatestFrom(this._store.select('films')),
      switchMap((filterFilm) => {
        return this._http
          .get<Films[]>(
            'https://api.themoviedb.org/3/movie/top_rated?api_key=3bf7fc56ee01b081668e7df85a3d2155&language=en-US&page=1'
          )
          .pipe(
            map((data) =>
              data['results'].map((obj) => {
                return {
                  original_title: obj.original_title,
                  id: obj.id,
                  genres: obj.genre_ids,
                  overview: obj.overview,
                  popularity: obj.popularity,
                  release_date: obj.release_date,
                  poster_path: this._webUrl.concat('', obj.poster_path),
                  vote_average: obj.vote_average * 10,
                  favourited: false,
                };
              })
            )
          );
      }),
      map((films) => {
        return FilmsActions.SetFilms({ films });
      })
    )
  );

  fetchSingleFilm$ = createEffect(() =>
    this._actions$.pipe(
      ofType(FilmsActions.FetchSingleFilm),
      withLatestFrom(this._store.select('films')),
      switchMap((filterFilm) => {
        return this._http
          .get<Films>(
            'https://api.themoviedb.org/3/movie/' +
              filterFilm[0].id +
              '?api_key=3bf7fc56ee01b081668e7df85a3d2155&language=en-US&append_to_response=videos,images,credits'
          )
          .pipe(
            map((data) => {
              return {
                original_title: data.original_title,
                id: data.id,
                genres: data.genres,
                overview: data.overview,
                popularity: data.popularity,
                release_date: data.release_date,
                poster_path: this._webUrl.concat('', data.poster_path),
                vote_average: data.vote_average * 10,
                runtime: this.calculateRuntime(data.runtime),
                videos: data.videos['results'],
                credits: data.credits['cast'],
                crew: data.credits['crew'],
              };
            })
          );
      }),
      map((film) => {
        return FilmsActions.SetFilm({ film });
      })
    )
  );

  calculateRuntime(runtime: number) {
    var hours = Math.floor(runtime / 60);
    var minutes = runtime % 60;
    return hours + 'h ' + minutes + 'm';
  }

  searchFilms$ = createEffect(() =>
    this._actions$.pipe(
      ofType(FilmsActions.SearchFilms),
      withLatestFrom(this._store.select('films')),
      switchMap((filmSearch) => {
        return this._http
          .get<Films[]>(
            'https://api.themoviedb.org/3/search/movie?api_key=3bf7fc56ee01b081668e7df85a3d2155&query=' +
              filmSearch[0].filmName +
              '&language=en-US&append_to_response=videos'
          )
          .pipe(
            map((data) =>
              data['results'].map((obj) => {
                return {
                  original_title: obj.original_title,
                  id: obj.id,
                  genres: obj.genre_ids,
                  overview: obj.overview,
                  popularity: obj.popularity,
                  release_date: obj.release_date,
                  poster_path: this._webUrl.concat('', obj.poster_path),
                  vote_average: obj.vote_average * 10,
                };
              })
            )
          );
      }),
      map((films) => {
        return FilmsActions.SetSearchFilms({ films });
      })
    )
  );

  setAsFavourite$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(FilmsActions.setAsFavourite),
        withLatestFrom(this._store.select('auth')),
        switchMap(([data, favouriteData]) => {
          return this._http.put(
            'https://ng-flixible-default-rtdb.europe-west1.firebasedatabase.app/favourites' +
              '/' +
              favouriteData.user['id'] +
              '/' +
              data.filmId +
              '/' +
              data.filmName +
              '.json',

            data.favourite
          );
        }),
        map((recipes) => {})
      ),
    { dispatch: false }
  );

  setAsWatched$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(FilmsActions.setAsWatched),
        withLatestFrom(this._store.select('auth')),
        switchMap(([data, watchedData]) => {
          return this._http.put(
            'https://ng-flixible-default-rtdb.europe-west1.firebasedatabase.app/watched' +
              '/' +
              watchedData.user['id'] +
              '/' +
              data.filmId +
              '/' +
              data.filmName +
              '.json',

            JSON.stringify(data.watched)
          );
        }),
        map((recipes) => {})
      ),
    { dispatch: false }
  );

  RemoveFavouriteFromList$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(FilmsActions.RemoveFavouriteFromList),
        withLatestFrom(this._store.select('auth')),
        switchMap(([data, favouriteData]) => {
          return this._http.put(
            'https://ng-flixible-default-rtdb.europe-west1.firebasedatabase.app/favourites' +
              '/' +
              favouriteData.user['id'] +
              '/' +
              data.filmId +
              '/' +
              data.filmName +
              '.json',

            data.favourite
          );
        }),
        map((res) => {
          return FilmsActions.fetchUsersFavourites();
        })
      ),
    { dispatch: true }
  );

  RemoveWatchedFromList$ = createEffect(() =>
    this._actions$.pipe(
      ofType(FilmsActions.RemoveWatchedFromList),
      withLatestFrom(this._store.select('auth')),
      switchMap(([data, watchedData]) => {
        return this._http.put(
          'https://ng-flixible-default-rtdb.europe-west1.firebasedatabase.app/watched' +
            '/' +
            watchedData.user['id'] +
            '/' +
            data.filmId +
            '/' +
            data.filmName +
            '.json',

          JSON.stringify(data.watched)
        );
      }),
      map(() => {
        return FilmsActions.fetchUsersWatched();
      })
    )
  );

  fetchInitialFavourite$ = createEffect(() =>
    this._actions$.pipe(
      ofType(FilmsActions.fetchInitialFavourite),
      withLatestFrom(this._store.select('auth')),
      switchMap(([filmId, auth]) => {
        return this._http
          .get<boolean>(
            'https://ng-flixible-default-rtdb.europe-west1.firebasedatabase.app/favourites/' +
              auth.user['id'] +
              '/' +
              filmId.filmId +
              '.json'
          )
          .pipe(
            map((data) => {
              if (!data) {
                return FilmsActions.setInitialFavourite({ favourite: false });
              }

              var favValue = Object.values(data);
              var fav = favValue.toString();
              var fav1 = JSON.parse(fav);
              return FilmsActions.setInitialFavourite({ favourite: fav1 });
            })
          );
      })
    )
  );

  fetchInitialWatched$ = createEffect(() =>
    this._actions$.pipe(
      ofType(FilmsActions.fetchInitialWatched),
      withLatestFrom(this._store.select('auth')),
      switchMap(([filmId, auth]) => {
        return this._http
          .get(
            'https://ng-flixible-default-rtdb.europe-west1.firebasedatabase.app/watched/' +
              auth.user['id'] +
              '/' +
              filmId.filmId +
              '.json'
          )
          .pipe(
            map((data) => {
              if (!data) {
                return FilmsActions.setInitialWatched({ watched: 'false' });
              }

              var watchValue = Object.values(data);
              var watched = watchValue.toString();

              return FilmsActions.setInitialWatched({ watched: watched });
            })
          );
      })
    )
  );

  fetchUsersFavourites$ = createEffect(() =>
    this._actions$.pipe(
      ofType(FilmsActions.fetchUsersFavourites),
      withLatestFrom(this._store.select('auth')),
      mergeMap(([filmId, auth]) => {
        return this._http
          .get<MovieData>(
            'https://ng-flixible-default-rtdb.europe-west1.firebasedatabase.app/favourites/' +
              auth.user['id'] +
              '.json'
          )
          .pipe(
            map((data) => {
              return FilmsActions.setUsersFavourites({
                favouriteList: data,
              });
            })
          );
      })
    )
  );

  fetchUsersWatched$ = createEffect(() =>
    this._actions$.pipe(
      ofType(FilmsActions.fetchUsersWatched),
      withLatestFrom(this._store.select('auth')),
      mergeMap(([filmId, auth]) => {
        return this._http
          .get(
            'https://ng-flixible-default-rtdb.europe-west1.firebasedatabase.app/watched/' +
              auth.user['id'] +
              '.json'
          )
          .pipe(
            map((data) => {
              return FilmsActions.setUsersWatched({
                watchedList: data,
              });
            })
          );
      })
    )
  );

  constructor(
    private _actions$: Actions,
    private _http: HttpClient,
    private _store: Store<fromApp.AppState>
  ) {}
}
