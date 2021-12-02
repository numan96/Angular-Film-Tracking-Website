import { createAction, props } from '@ngrx/store';
import { Films } from '../films.model';

//Maybe rename to fetch most popular then add most recent, upcoming etc.
export const FetchPopularFilms = createAction('[Films] Fetch Popular Films');

export const FetchNowPlayingFilms = createAction(
  '[Films] Fetch Now Playing Films'
);

export const FetchUpcomingFilms = createAction('[Films] Fetch Upcoming Films');

export const FetchTopRatedFilms = createAction('[Films] Fetch Top Rated Films');

export const SetFilms = createAction(
  '[Films] Set Films',
  props<{ films: Films[] }>()
);
