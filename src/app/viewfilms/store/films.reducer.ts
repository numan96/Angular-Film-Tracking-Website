import { createReducer, on, Action } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Films } from '../films.model';
import * as FilmsActions from './films.actions';

export interface State {
  films: Films[];
  film: Films;
}

export const initialState: State = {
  films: [],
  film: null,
};

const _filmsReducer = createReducer(
  initialState,
  on(FilmsActions.SetFilms, (state, action) => ({
    ...state,
    films: [...action.films],
  })),
  on(FilmsActions.SetFilm, (state, action) => ({ ...state, film: action.film }))
);

export function filmsReducer(state: State | undefined, action: Action) {
  return _filmsReducer(state, action);
}

export const selectFeautre = (state: State) => state.film;
