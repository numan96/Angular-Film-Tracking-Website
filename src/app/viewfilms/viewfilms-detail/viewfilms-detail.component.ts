import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { concat, Subscription } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import * as fromApp from '../../store/app.reducer';
import { Films } from '../films.model';
import * as FilmsActions from '../store/films.actions';
import { selectFeature } from '../store/films.reducer';
@Component({
  selector: 'app-viewfilms-detail',
  templateUrl: './viewfilms-detail.component.html',
  styleUrls: ['./viewfilms-detail.component.sass'],
})
export class ViewfilmsDetailComponent implements OnInit {
  film: Films;
  id: number;
  apiLoaded = false;
  isLoggedIn: Boolean = true;
  favourited = false;
  watched = false;
  private userSub: Subscription;

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
            console.log('select', selectFeature);
          }
        })
      ),
      this.store.select('films').pipe(
        map((filmState) => {
          console.log('Film state:', filmState);
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
}
