import { ActionReducerMap } from '@ngrx/store';
import * as fromFilms from '../viewfilms/store/films.reducer';

export interface AppState {
  films: fromFilms.State;
}
