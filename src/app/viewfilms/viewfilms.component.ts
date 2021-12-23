import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
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
  favouriteFilms = {
    '1930': true,
    '102382': true,
    '315635': true,
    '370172': true,
    '512195': false,
    '580489': true,
    '624860': true,
    '634649': true,
    '19404': true,
  };
  favourite = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.subscription = this.store
      .select('films')
      .pipe(map((filmsState) => filmsState.films))
      .subscribe((films: Films[]) => {
        this.films = films;
        console.log();
      });

    for (let n = 0; n < this.films.length; n++) {
      if (this.films[n].id === +Object.keys(this.favouriteFilms)[n]) {
        // if (Object.values(this.favouriteFilms) === true) {
        console.log('true');
        // } else {
        //   console.log('false');
        // }
      } else {
        console.log('false');
        // console.log(this.favourite);
      }
    }
  }

  popularFilms() {
    this.films = [];
    this.store.dispatch(FilmsActions.FetchPopularFilms());
  }

  nowPlayingFilms() {
    this.films = [];
    this.store.dispatch(FilmsActions.FetchNowPlayingFilms());
    console.log(this.films);
  }

  upcomingFilms() {
    this.films = [];
    this.store.dispatch(FilmsActions.FetchUpcomingFilms());
    console.log(this.films);
  }

  topRatedFilms() {
    this.films = [];
    this.store.dispatch(FilmsActions.FetchTopRatedFilms());
    console.log(this.films);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
