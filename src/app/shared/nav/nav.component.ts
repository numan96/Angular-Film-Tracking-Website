import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as FilmsActions from '../../viewfilms/store/films.actions';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass'],
})
export class NavComponent implements OnInit {
  //change to false state.
  isLoggedIn: Boolean = true;
  filmName = new FormControl('');
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {}

  onKey(filmName: string) {
    if (filmName.length > 0) {
      this.store.dispatch(FilmsActions.SearchFilms({ filmName }));
    } else {
      this.store.dispatch(FilmsActions.FetchPopularFilms());
    }
  }
}
