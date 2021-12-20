import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import * as authActions from './store/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenExpirationTimer: any;
  constructor(
    // private http: HttpClient, private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(authActions.Logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }
}
