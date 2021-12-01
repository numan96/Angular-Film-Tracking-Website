import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Films } from './films.model';
import * as fromApp from '../store/app.reducer';
import { ViewfilmsService } from './viewfilms.service';
@Component({
  selector: 'app-viewfilms',
  templateUrl: './viewfilms.component.html',
  styleUrls: ['./viewfilms.component.sass'],
  providers: [ViewfilmsService],
})
export class ViewfilmsComponent implements OnInit, OnDestroy {
  films: Films[];
  subscription: Subscription;

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
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
