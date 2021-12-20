import * as fromFilms from '../viewfilms/store/films.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
export interface AppState {
  films: fromFilms.State;
  auth: fromAuth.State;
}
