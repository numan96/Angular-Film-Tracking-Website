import { createAction, props } from '@ngrx/store';
import { Films } from '../films.model';

export const FetchPopularFilms = createAction('[Films] Fetch Popular Films');

export const FetchNowPlayingFilms = createAction(
  '[Films] Fetch Now Playing Films'
);

export const FetchUpcomingFilms = createAction('[Films] Fetch Upcoming Films');

export const FetchTopRatedFilms = createAction('[Films] Fetch Top Rated Films');

export const SearchFilms = createAction(
  '[Films] Search Films',
  props<{ filmName: string }>()
);

export const FetchSingleFilm = createAction(
  '[Films] Fetch A Single Film',

  props<{ id: number }>()
);

export const SetFilm = createAction(
  '[Films] Set Film',
  props<{ film: Films }>()
);

export const SetFilms = createAction(
  '[Films] Set Films',
  props<{ films: Films[] }>()
);

export const SetSearchFilms = createAction(
  '[Films] Set Searched Films',
  props<{ films: Films[] }>()
);

export const setAsFavourite = createAction(
  '[Films] Set Film as Favourite',
  props<{ filmId: number; filmName: string; favourite: boolean }>()
);

export const RemoveFavouriteFromList = createAction(
  '[Films] Remove Film from Fav List',
  props<{ filmId: number; filmName: string; favourite: boolean }>()
);

export const fetchInitialFavourite = createAction(
  '[Films] Fetch initial film favourite boolean.',
  props<{ filmId: number }>()
);

export const setInitialFavourite = createAction(
  '[Films] Set initial film favourite boolean.',
  props<{ favourite: boolean }>()
);

export const fetchUsersFavourites = createAction(
  '[Films] Fetch users film favourite list.'
);

export const setUsersFavourites = createAction(
  '[Films] Set users film favourite list.',
  props<{ favouriteList: object }>()
);

export const clearUserData = createAction(
  '[Films] Clear users data on logout.'
);
