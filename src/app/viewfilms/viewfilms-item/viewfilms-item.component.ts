import { Component, Input, OnInit } from '@angular/core';
import { Films } from '../films.model';
import * as fromApp from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { concat, map, Subscription } from 'rxjs';
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
  isLoggedIn = false;
  private userSub: Subscription;
  private favouriteSub: Subscription;
  favourited = false;
  watched = false;
  favouritesList;
  watchedList;
  id: number;
  isButtonVisible = true;

  constructor(
    private store: Store<fromApp.AppState>,
    public datepipe: DatePipe
  ) {}

  ngOnInit() {
    this.userSub = this.store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        this.isLoggedIn = !!user;
      });

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
  onFavourite(favourite: boolean) {
    const id = this.filmItem.id;
    favourite = !favourite;
    console.log(favourite);
    const filmName = this.filmItem.original_title;
    this.store.dispatch(
      FilmsActions.RemoveFavouriteFromList({
        filmId: id,
        filmName: filmName,
        favourite: favourite,
      })
    );
  }

  onWatched(watched: string) {
    const id = this.filmItem.id;
    const filmName = this.filmItem.original_title;

    if (watched === 'false') {
      const watchedVar = new Date();
      const watched1 = this.datepipe.transform(watchedVar, 'yyyy-MM-dd');

      this.store.dispatch(
        FilmsActions.RemoveWatchedFromList({
          filmId: id,
          filmName: filmName,
          watched: watched1,
        })
      );
    } else {
      this.store.dispatch(
        FilmsActions.RemoveWatchedFromList({
          filmId: id,
          filmName: filmName,
          watched: 'false',
        })
      );
    }
  }
}
