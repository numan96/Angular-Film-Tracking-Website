import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import * as authActions from './store/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _tokenExpirationTimer: any;
  constructor(private _store: Store<fromApp.AppState>) {}

  public setLogoutTimer(expirationDuration: number) {
    this._tokenExpirationTimer = setTimeout(() => {
      this._store.dispatch(authActions.Logout());
    }, expirationDuration);
  }

  public clearLogoutTimer() {
    if (this._tokenExpirationTimer) {
      clearTimeout(this._tokenExpirationTimer);
      this._tokenExpirationTimer = null;
    }
  }
}
