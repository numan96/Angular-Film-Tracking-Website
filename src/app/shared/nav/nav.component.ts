import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { Films } from 'src/app/viewfilms/films.model';
import * as fromApp from '../../store/app.reducer';
import * as FilmsActions from '../../viewfilms/store/films.actions';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass'],
})
export class NavComponent implements OnInit {
  //change to false state.
  films: Films[];
  subscription: Subscription;
  isLoggedIn: Boolean = true;
  filmName = new FormControl('');
  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select('films')
      .pipe(map((filmsState) => filmsState.searchFilms))
      .subscribe((films: Films[]) => {
        this.films = films;
      });
  }

  onKey(filmName: string) {
    if (filmName.length > 0) {
      this.store.dispatch(FilmsActions.SearchFilms({ filmName }));
    }
  }

  toFilm(id: any) {
    let url = 'films/' + id;
    if (this.router.url != '/films') {
      this.store.dispatch(FilmsActions.FetchSingleFilm({ id: id }));
      this.router.navigateByUrl(url);
    } else {
      this.router.navigateByUrl(url);
    }

    this.filmName.setValue('');
    this.films = [];
  }
}
