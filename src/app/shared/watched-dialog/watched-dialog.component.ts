import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as FilmsActions from '../../viewfilms/store/films.actions';

@Component({
  selector: 'app-watched-dialog',
  templateUrl: './watched-dialog.component.html',
  styleUrls: ['./watched-dialog.component.sass'],
  providers: [],
})
export class WatchedDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<WatchedDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      filmId: number;
      filmName: string;
      watched: 'false';
    },
    private _store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {}

  public onNoClick() {
    this.dialogRef.close();
  }

  public onSubmit() {
    this._store.dispatch(
      FilmsActions.setAsWatched({
        filmId: this.data.filmId,
        filmName: this.data.filmName,
        watched: this.data.watched,
      })
    );
  }
}
