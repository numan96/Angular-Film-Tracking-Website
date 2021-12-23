import { Component, Input, OnInit } from '@angular/core';
import { Films } from '../films.model';
import * as fromApp from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
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

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.userSub = this.store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        this.isLoggedIn = !!user;
      });
  }

  onFavourite() {
    this.favourited = !this.favourited;
  }
}
