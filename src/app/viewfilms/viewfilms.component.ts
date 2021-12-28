import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { concat, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Films } from './films.model';
import * as fromApp from '../store/app.reducer';
import { ViewfilmsService } from './viewfilms.service';
import * as FilmsActions from './store/films.actions';
@Component({
  selector: 'app-viewfilms',
  templateUrl: './viewfilms.component.html',
  styleUrls: ['./viewfilms.component.sass'],
  providers: [ViewfilmsService],
})
export class ViewfilmsComponent implements OnInit, OnDestroy {
  films: Films[];
  subscription: Subscription;
  favouritesList;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.store.dispatch(FilmsActions.fetchUsersFavourites());

    this.setFilmFavourites();
    this.subscription = this.store
      .select('films')
      .pipe(map((filmsState) => filmsState.films))
      .subscribe((films: Films[]) => {
        this.films = films;
        console.log();
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
  }

  popularFilms() {
    this.films = [];
    this.store.dispatch(FilmsActions.FetchPopularFilms());
    this.setFilmFavourites();
  }

  nowPlayingFilms() {
    this.films = [];
    this.store.dispatch(FilmsActions.FetchNowPlayingFilms());
    console.log(this.films);
    this.setFilmFavourites();
  }

  upcomingFilms() {
    this.films = [];
    this.store.dispatch(FilmsActions.FetchUpcomingFilms());
    console.log(this.films);
    this.setFilmFavourites();
  }

  topRatedFilms() {
    this.films = [];
    this.store.dispatch(FilmsActions.FetchTopRatedFilms());
    console.log(this.films);
    this.setFilmFavourites();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setFilmFavourites() {
    setTimeout(() => {
      if (!this.favouritesList) {
        for (var i = 0; i < 20; i++) {
          this.store.dispatch(
            FilmsActions.RemoveFavouriteFromList({
              filmId: this.films[i].id,
              filmName: this.films[i].original_title,
              favourite: false,
            })
          );
        }
      } else {
        var favValue = Object.keys(this.favouritesList);
        var fav = favValue.toString();
        var fav1 = fav.split(',');
        var arrayofFavs = fav1.map(Number);
        for (var i = 0; i < 20; i++) {
          if (arrayofFavs.includes(this.films[i].id)) {
            console.log('found in your fav list ' + this.films[i].id);
          } else {
            console.log('not found in fav list ' + this.films[i].id);
            this.store.dispatch(
              FilmsActions.RemoveFavouriteFromList({
                filmId: this.films[i].id,
                filmName: this.films[i].original_title,
                favourite: false,
              })
            );
          }
        }
      }
    }, 500);
  }
}
