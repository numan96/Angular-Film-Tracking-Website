import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as FilmsActions from '../../viewfilms/store/films.actions';
import * as fromApp from '../../store/app.reducer';
import { map, Subscription } from 'rxjs';
@Component({
  selector: 'app-favouritesList',
  templateUrl: './favouritesList.component.html',
  styleUrls: ['./favouritesList.component.css'],
})
export class FavouritesListComponent implements OnInit {
  private favouriteSub: Subscription;
  favouritesList;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.store.dispatch(FilmsActions.fetchUsersFavourites());

    this.favouriteSub = this.store
      .select('films')
      .pipe(map((filmState) => filmState.favouriteList))
      .subscribe((favourite) => {
        this.favouritesList = favourite;
        console.log(this.favouritesList);
      });
  }
}
