import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { Films } from 'src/app/viewfilms/films.model';
import * as fromApp from '../../store/app.reducer';
import * as FilmsActions from '../../viewfilms/store/films.actions';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass'],
})
export class SearchComponent implements OnInit {
  filmName = new FormControl('');
  films: Films[];
  subscription: Subscription;
  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  ngOnInit() {
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
