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
  watchedList;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.store.dispatch(FilmsActions.fetchUsersWatched());

    concat(
      this.store
        .select('films')
        .pipe(map((filmState) => filmState.watchedList))
        .pipe(
          map((watched) => {
            this.watchedList = watched;
          })
        )
    ).subscribe();
  }

  onDelete(filmId, filmName) {
    this.store.dispatch(
      FilmsActions.RemoveWatchedFromList({
        filmId: filmId,
        filmName: filmName,
        watched: 'false',
      })
    );
  }
}
