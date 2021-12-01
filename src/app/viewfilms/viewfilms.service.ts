import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Films } from './films.model';

@Injectable({
  providedIn: 'root',
})
export class ViewfilmsService {
  filmsChanged = new Subject<Films[]>();

  private films: Films[] = [];

  setFilms(films: Films[]) {
    this.films = films;
    this.filmsChanged.next(this.films.slice());
  }

  getFilms() {
    return this.films.slice();
  }

  constructor() {}
}
