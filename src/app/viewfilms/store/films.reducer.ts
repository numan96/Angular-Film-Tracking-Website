import { createReducer, on, Action } from '@ngrx/store';
import { Films } from '../films.model';
import * as FilmsActions from './films.actions';

export interface State {
  films: Films[];
}

export const initialState: State = {
  films: [],
};

const _filmsReducer = createReducer(
  initialState,
  on(FilmsActions.SetFilms, (state, action) => ({
    ...state,
    films: [...action.films],
  }))
);
export function filmsReducer(state: State | undefined, action: Action) {
  return _filmsReducer(state, action);
}
