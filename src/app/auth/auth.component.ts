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
  authForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  isLoading = false;
  isLoginMode = true;
  error: string = null;
  private closeSub: Subscription;
  private storeSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.storeSub = this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }
    var email = this.authForm.get('email').value;
    var password = this.authForm.get('password').value;

    if (this.isLoginMode) {
      this.store.dispatch(
        authActions.LoginStart({ email: email, password: password })
      );
    } else {
      this.store.dispatch(
        authActions.SignupStart({ email: email, password: password })
      );
    }

    this.authForm.reset();
  }

  onHandleError() {
    this.store.dispatch(authActions.ClearError());
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }

    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
