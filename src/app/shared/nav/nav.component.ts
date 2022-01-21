import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import * as authActions from 'src/app/auth/store/auth.actions';
import * as fromApp from 'src/app/store/app.reducer';
import * as filmsActions from 'src/app/viewfilms/store/films.actions';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass'],
})
export class NavComponent implements OnInit {
  public isLoggedIn = false;
  public userName: string = '';

  constructor(private _store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this._store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        this.isLoggedIn = !!user;
        if (user != null) {
          this.userName = user.email;
        }
      });
  }

  public onLogout() {
    this._store.dispatch(authActions.Logout());
    this._store.dispatch(filmsActions.clearUserData());
  }
}
