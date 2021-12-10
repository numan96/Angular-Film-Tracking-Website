import { createAction, props } from '@ngrx/store';
import { MovieData } from '../data.model';
import { Films } from '../films.model';

//Maybe rename to fetch most popular then add most recent, upcoming etc.
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
