import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import * as fromApp from '../../store/app.reducer';
import { Films } from '../films.model';
@Component({
  selector: 'app-viewfilms-detail',
  templateUrl: './viewfilms-detail.component.html',
  styleUrls: ['./viewfilms-detail.component.sass'],
})
export class ViewfilmsDetailComponent implements OnInit {
  film: Films;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params) => {
          return +params['id'];
        }),
        switchMap((id) => {
          this.id = id;
          return this.store.select('films');
        }),
        map((filmsState) => {
          return filmsState.films.find((film, index) => {
            return index === this.id;
          });
        })
      )
      .subscribe((film) => {
        this.film = film;
      });

    console.log(this.film);
  }
}
