import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { concat, Subscription } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import * as fromApp from '../../store/app.reducer';
import { MovieData } from '../data.model';
import { Films } from '../films.model';
import * as FilmsActions from '../store/films.actions';
import { selectFeature } from '../store/films.reducer';
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
  watched = false;
  private userSub: Subscription;
  private favouriteSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.userSub = this.store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        this.isLoggedIn = !!user;
        this.userId = user.id;
        console.log(this.userId);
      });

    this.favouriteSub = this.store
      .select('films')
      .pipe(map((filmState) => filmState.favourites))
      .subscribe((favourite) => {
        this.favourited = favourite;
      });

    concat(
      this.route.params.pipe(
        take(1),
        map((params) => {
          console.log('pparams:', params);
          this.id = params['id'];
          return +params['id'];
        }),
        tap((film) => {
          console.log('film:', film);

          if (!this.film) {
            console.log('Fetch Single Film');
            this.store.dispatch(FilmsActions.FetchSingleFilm({ id: this.id }));
            console.log('Fetch Favourite');
            this.store.dispatch(
              FilmsActions.fetchInitialFavourite({ filmId: this.id })
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

  onFavourite() {
    this.favourited = !this.favourited;
    const id = this.id;
    const favourite = this.favourited;
    this.store.dispatch(
      FilmsActions.setAsFavourite({ filmId: id, favourite: favourite })
    );

    //boolean changes in the API with the film ID and favourite boolean, boolean sent to firebase:
    //userId sent aswell to match up with Db.

    //PUT REQUEST TO FAVOURITE, DELETE REQUEST IF DESELECTING
  }

  ngOnDestroy(): void {
    this.favouriteSub.unsubscribe();
  }
}
