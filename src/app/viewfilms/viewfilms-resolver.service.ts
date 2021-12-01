import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Films } from './films.model';
import * as fromApp from '../store/app.reducer';
import * as FilmsActions from './store/films.actions';

@Injectable({ providedIn: 'root' })
export class ViewFilmsResolverService implements Resolve<{ films: Films[] }> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('films').pipe(
      take(1),
      map((filmState) => {
        return filmState.films;
      }),
      switchMap((films) => {
        if (films.length === 0) {
          this.store.dispatch(FilmsActions.FetchFilms());
          return this.actions$.pipe(ofType(FilmsActions.SetFilms), take(1));
        } else {
          return of({ films });
        }
      })
    );
  }
}
