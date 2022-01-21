import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { concat } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { WatchedDialogComponent } from 'src/app/shared/watched-dialog/watched-dialog.component';
import * as fromApp from '../../store/app.reducer';
import { Films } from '../films.model';
import * as FilmsActions from '../store/films.actions';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-viewfilms-detail',
  templateUrl: './viewfilms-detail.component.html',
  styleUrls: ['./viewfilms-detail.component.sass'],
})
export class ViewfilmsDetailComponent implements OnInit {
  public film: Films;
  public isLoggedIn: Boolean = true;
  public favourited = false;
  public watched = 'false';
  private _id: number;
  private _apiLoaded = false;
  private _userId: string;

  constructor(
    public dialog: MatDialog,
    public datepipe: DatePipe,
    private _route: ActivatedRoute,
    private _store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this._store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        this.isLoggedIn = !!user;
        this._userId = user.id;
      });

    this._store
      .select('films')
      .pipe(map((filmState) => filmState.favourites))
      .subscribe((favourite) => {
        this.favourited = favourite;
      });

    this._store
      .select('films')
      .pipe(map((filmState) => filmState.watched))
      .subscribe((watched) => {
        this.watched = watched;
      });

    concat(
      this._route.params.pipe(
        take(1),
        map((params) => {
          this._id = params['id'];
          return +params['id'];
        }),
        tap((film) => {
          if (!this.film) {
            this._store.dispatch(
              FilmsActions.FetchSingleFilm({ id: this._id })
            );
            this._store.dispatch(
              FilmsActions.fetchInitialFavourite({
                filmId: this._id,
              })
            );
            this._store.dispatch(
              FilmsActions.fetchInitialWatched({
                filmId: this._id,
              })
            );
          }
        })
      ),
      this._store.select('films').pipe(
        map((filmState) => {
          return (this.film = filmState['film']);
        })
      )
    ).subscribe();

    if (!this._apiLoaded) {
      // This code loads the IFrame Player API code asynchronously, according to the instructions at
      // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this._apiLoaded = true;
    }
  }

  public openDialog() {
    const dialogRef = this.dialog.open(WatchedDialogComponent, {
      data: {
        filmId: this._id,
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

  public onFavourite() {
    this.favourited = !this.favourited;
    const id = this._id;
    const favourite = this.favourited;
    const filmName = this.film.original_title;
    this._store.dispatch(
      FilmsActions.setAsFavourite({
        filmId: id,
        filmName: filmName,
        favourite: favourite,
      })
    );
  }

  public onWatched() {
    const id = this._id;
    const filmName = this.film.original_title;
    if (this.watched === 'false') {
      const watched = new Date();
      const watched1 = this.datepipe.transform(watched, 'yyyy-MM-dd');
      this.watched = watched1;
      this._store.dispatch(
        FilmsActions.setAsWatched({
          filmId: id,
          filmName: filmName,
          watched: watched1,
        })
      );
    }
  }
}
