import { Component, OnInit } from '@angular/core';
import * as fromApp from './store/app.reducer';
import * as authActions from './auth/store/auth.actions';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  title = 'flixible';

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.store.dispatch(authActions.AutoLogin());
  }
}
