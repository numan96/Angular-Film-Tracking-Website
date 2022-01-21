import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from 'src/app/store/app.reducer';
import * as authActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass'],
})
export class AuthComponent implements OnInit, OnDestroy {
  public authForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  public isLoading = false;
  public isLoginMode = true;
  public error: string = null;
  private _storeSub: Subscription;

  constructor(private _store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this._storeSub = this._store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
    });
  }

  public onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  public onSubmit() {
    if (!this.authForm.valid) {
      return;
    }
    var email = this.authForm.get('email').value;
    var password = this.authForm.get('password').value;

    if (this.isLoginMode) {
      this._store.dispatch(
        authActions.LoginStart({ email: email, password: password })
      );
    } else {
      this._store.dispatch(
        authActions.SignupStart({ email: email, password: password })
      );
    }

    this.authForm.reset();
  }

  ngOnDestroy() {
    if (this._storeSub) {
      this._storeSub.unsubscribe();
    }
  }
}
