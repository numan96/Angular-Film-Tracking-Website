import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as fromApp from '../../store/app.reducer';
import { MovieData } from '../data.model';
import { Films } from '../films.model';
import * as FilmsActions from '../store/films.actions';
import { ViewfilmsService } from '../viewfilms.service';

@Injectable()
export class FilmsEffects {
  webUrl = 'https://image.tmdb.org/t/p/w500';

  //maybe can change which api it uses based on if its most popular, now playing, top rated etc.
  fetchFilms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilmsActions.FetchFilms),
      withLatestFrom(this.store.select('films')),
      switchMap(() => {
        return this.http
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
                  poster_path: this.webUrl.concat('', obj.poster_path),
                  vote_average: obj.vote_average * 10,
                };
              })
            )
          );
      }),
      map((films) => {
        console.log(films);
        return FilmsActions.SetFilms({ films });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private vfService: ViewfilmsService,
    private store: Store<fromApp.AppState>
  ) {}
}
