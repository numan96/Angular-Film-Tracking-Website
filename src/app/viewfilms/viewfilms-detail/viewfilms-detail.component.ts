import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { concat, Subscription } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { WatchedDialogComponent } from 'src/app/shared/watched-dialog/watched-dialog.component';
import * as fromApp from '../../store/app.reducer';
import { Films } from '../films.model';
import * as FilmsActions from '../store/films.actions';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-viewfilms-detail',
  templateUrl: './viewfilms-detail.component.html',
  styleUrls: ['./viewfilms-detail.component.sass'],
})
export class ViewfilmsDetailComponent implements OnInit, OnDestroy {
  film: Films;
  id: number;
  apiLoaded = false;
  isLoggedIn: Boolean = true;

  //favourited subscribed to from store

  userId: string;
  favourited = false;
  watched = 'false';
  private userSub: Subscription;
  private favouriteSub: Subscription;
  private watchedSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>,
    public dialog: MatDialog,
    public datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.userSub = this.store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        this.isLoggedIn = !!user;
        this.userId = user.id;
      });

    this.favouriteSub = this.store
      .select('films')
      .pipe(map((filmState) => filmState.favourites))
      .subscribe((favourite) => {
        this.favourited = favourite;
      });

    this.watchedSub = this.store
      .select('films')
      .pipe(map((filmState) => filmState.watched))
      .subscribe((watched) => {
        this.watched = watched;
      });

    concat(
      this.route.params.pipe(
        take(1),
        map((params) => {
          this.id = params['id'];
          return +params['id'];
        }),
        tap((film) => {
          if (!this.film) {
            this.store.dispatch(FilmsActions.FetchSingleFilm({ id: this.id }));
            this.store.dispatch(
              FilmsActions.fetchInitialFavourite({
                filmId: this.id,
              })
            );
            this.store.dispatch(
              FilmsActions.fetchInitialWatched({
                filmId: this.id,
              })
            );
          }
        })
      ),
      this.store.select('films').pipe(
        map((filmState) => {
          return (this.film = filmState['film']);
        })
      )
    ).subscribe();

    if (!this.apiLoaded) {
      // This code loads the IFrame Player API code asynchronously, according to the instructions at
      // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }

  setWatchedToFalse() {
    this.watched = 'false';
  }
  openDialog() {
    const dialogRef = this.dialog.open(WatchedDialogComponent, {
      data: {
        filmId: this.id,
        filmName: this.film.original_title,
        watched: 'false',
      },
      panelClass: 'custom-dialog',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'false') {
        this.watched = result;
      }
    });
  }

  onFavourite() {
    this.favourited = !this.favourited;
    const id = this.id;
    const favourite = this.favourited;
    const filmName = this.film.original_title;
    this.store.dispatch(
      FilmsActions.setAsFavourite({
        filmId: id,
        filmName: filmName,
        favourite: favourite,
      })
    );
  }

  onWatched() {
    const id = this.id;
    const filmName = this.film.original_title;

    if (this.watched === 'false') {
      const watched = new Date();
      const watched1 = this.datepipe.transform(watched, 'yyyy-MM-dd');
      this.watched = watched1;
      this.store.dispatch(
        FilmsActions.setAsWatched({
          filmId: id,
          filmName: filmName,
          watched: watched1,
        })
      );
    }
  }

  ngOnDestroy(): void {}
}
