import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as FilmsActions from '../../viewfilms/store/films.actions';
import * as fromApp from '../../store/app.reducer';
import { concat, map, Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-favouritesList',
  templateUrl: './favouritesList.component.html',
  styleUrls: ['./favouritesList.component.sass'],
})
export class FavouritesListComponent implements OnInit {
  favouritesList;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.store.dispatch(FilmsActions.fetchUsersFavourites());

    concat(
      this.store
        .select('films')
        .pipe(map((filmState) => filmState.favouriteList))
        .pipe(
          map((favourite) => {
            this.favouritesList = favourite;
          })
        )
    ).subscribe();
  }

  onDelete(filmId, filmName) {
    this.store.dispatch(
      FilmsActions.RemoveFavouriteFromList({
        filmId: filmId,
        filmName: filmName,
        favourite: false,
      })
    );
  }
}
