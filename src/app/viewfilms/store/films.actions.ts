import { createAction, props } from '@ngrx/store';
import { Films } from '../films.model';

//Maybe rename to fetch most popular then add most recent, upcoming etc.
export const FetchFilms = createAction('[Films] Fetch Films');

export const SetFilms = createAction(
  '[Films] Set Films',
  props<{ films: Films[] }>()
);
