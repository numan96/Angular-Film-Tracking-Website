import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import * as authActions from 'src/app/auth/store/auth.actions';
import * as fromApp from 'src/app/store/app.reducer';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass'],
})
export class NavComponent implements OnInit, OnDestroy {
  //change to false state.
  isLoggedIn = false;
  userName = '';
  private userSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.userSub = this.store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        this.isLoggedIn = !!user;

        this.userName = user.email;
      });
  }

  onLogout() {
    this.store.dispatch(authActions.Logout());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
