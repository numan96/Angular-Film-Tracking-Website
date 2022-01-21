import { Component, Input, OnInit } from '@angular/core';
import { Films } from '../films.model';
import * as fromApp from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { concat, map } from 'rxjs';
import * as FilmsActions from '../store/films.actions';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-viewfilms-item',
  templateUrl: './viewfilms-item.component.html',
  styleUrls: ['./viewfilms-item.component.sass'],
})
export class ViewfilmsItemComponent implements OnInit {
  @Input('filmItemArray') filmItem: Films;
  @Input() index: number;
  public isLoggedIn = false;
  public favourited = false;
  public watched = false;
  public favouritesList;
  public watchedList;

  constructor(
    private _store: Store<fromApp.AppState>,
    private _datepipe: DatePipe
  ) {}

  ngOnInit() {
    this._store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        this.isLoggedIn = !!user;
      });

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

  public onFavourite(favourite: boolean) {
    const id = this.filmItem.id;
    favourite = !favourite;
    const filmName = this.filmItem.original_title;
    this._store.dispatch(
      FilmsActions.RemoveFavouriteFromList({
        filmId: id,
        filmName: filmName,
        favourite: favourite,
      })
    );
  }

  public onWatched(watched: string) {
    const id = this.filmItem.id;
    const filmName = this.filmItem.original_title;

    if (watched === 'false') {
      const watchedVar = new Date();
      const watched1 = this._datepipe.transform(watchedVar, 'yyyy-MM-dd');

      this._store.dispatch(
        FilmsActions.RemoveWatchedFromList({
          filmId: id,
          filmName: filmName,
          watched: watched1,
        })
      );
    } else {
      this._store.dispatch(
        FilmsActions.RemoveWatchedFromList({
          filmId: id,
          filmName: filmName,
          watched: 'false',
        })
      );
    }
  }
}
