import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as FilmsActions from '../../viewfilms/store/films.actions';
import * as fromApp from '../../store/app.reducer';
import { concat, map } from 'rxjs';
@Component({
  selector: 'app-favouritesList',
  templateUrl: './favouritesList.component.html',
  styleUrls: ['./favouritesList.component.sass'],
})
export class FavouritesListComponent implements OnInit {
  public favouritesList;

  constructor(private _store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this._store.dispatch(FilmsActions.fetchUsersFavourites());

    concat(
      this._store
        .select('films')
        .pipe(map((filmState) => filmState.favouriteList))
        .pipe(
          map((favourite) => {
            this.favouritesList = favourite;
          })
        )
    ).subscribe();
  }

  public onDelete(filmId, filmName: string) {
    this._store.dispatch(
      FilmsActions.RemoveFavouriteFromList({
        filmId: filmId,
        filmName: filmName,
        favourite: false,
      })
    );
  }
}
