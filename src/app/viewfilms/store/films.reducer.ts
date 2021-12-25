import { createReducer, on, Action } from '@ngrx/store';
import { Films } from '../films.model';
import * as FilmsActions from './films.actions';

export interface State {
  films: Films[];
  film: Films;
  searchFilms: Films[];
  favourites: boolean;
  favouriteList: any;
}

export const initialState: State = {
  films: [],
  film: null,
  searchFilms: [],
  favourites: null,
  favouriteList: null,
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
  })),
  on(FilmsActions.setInitialFavourite, (state, action) => ({
    ...state,
    favourites: action.favourite,
  })),
  on(FilmsActions.setUsersFavourites, (state, action) => ({
    ...state,
    favouriteList: action.favouriteList,
  })),
  on(FilmsActions.clearUserData, (state) => ({
    ...state,
    favourites: null,
    favouriteList: null,
  }))
);

export function filmsReducer(state: State | undefined, action: Action) {
  return _filmsReducer(state, action);
}

export const selectFeature = (state: State) => state.film;
