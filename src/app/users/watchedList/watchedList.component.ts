import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { concat, map } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import * as FilmsActions from '../../viewfilms/store/films.actions';
@Component({
  selector: 'app-watchedList',
  templateUrl: './watchedList.component.html',
  styleUrls: ['./watchedList.component.sass'],
})
export class WatchedListComponent implements OnInit {
  public watchedList;
  constructor(private _store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this._store.dispatch(FilmsActions.fetchUsersWatched());

    concat(
      this._store
        .select('films')
        .pipe(map((filmState) => filmState.watchedList))
        .pipe(
          map((watched) => {
            this.watchedList = watched;
          })
        )
    ).subscribe();
  }

  public onDelete(filmId, filmName: string) {
    this._store.dispatch(
      FilmsActions.RemoveWatchedFromList({
        filmId: filmId,
        filmName: filmName,
        watched: 'false',
      })
    );
  }
}
