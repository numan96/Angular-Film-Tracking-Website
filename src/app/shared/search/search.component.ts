import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { Films } from 'src/app/viewfilms/films.model';
import * as fromApp from '../../store/app.reducer';
import * as FilmsActions from '../../viewfilms/store/films.actions';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass'],
})
export class SearchComponent implements OnInit {
  public filmName = new FormControl('');
  public films: Films[];
  constructor(
    private _store: Store<fromApp.AppState>,
    private _router: Router
  ) {}

  ngOnInit() {
    this._store
      .select('films')
      .pipe(map((filmsState) => filmsState.searchFilms))
      .subscribe((films: Films[]) => {
        this.films = films;
      });
  }

  public onKey(filmName: string) {
    if (filmName.length > 0) {
      this._store.dispatch(FilmsActions.SearchFilms({ filmName }));
    }
  }

  public toFilm(id: any) {
    let url = 'films/' + id;
    if (this._router.url != '/films') {
      this._store.dispatch(FilmsActions.FetchSingleFilm({ id: id }));
      this._router.navigateByUrl(url);
    } else {
      this._router.navigateByUrl(url);
    }

    this.filmName.setValue('');
    this.films = [];
  }
}
