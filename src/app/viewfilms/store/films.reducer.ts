import { createReducer, on, Action } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Films } from '../films.model';
import * as FilmsActions from './films.actions';

export interface State {
  films: Films[];
  film: Films;
  searchFilms: Films[];
}

export const initialState: State = {
  films: [],
  film: null,
  searchFilms: [],
};

const _filmsReducer = createReducer(
  initialState,
  on(FilmsActions.SetFilms, (state, action) => ({
    ...state,
    films: [...action.films],
  })),
  on(FilmsActions.SetFilm, (state, action) => ({
    ...state,
    film: action.film,
  })),
  on(FilmsActions.SetSearchFilms, (state, action) => ({
    ...state,
    searchFilms: [...action.films],
  }))
);

export function filmsReducer(state: State | undefined, action: Action) {
  return _filmsReducer(state, action);
}

export const selectFeature = (state: State) => state.film;
