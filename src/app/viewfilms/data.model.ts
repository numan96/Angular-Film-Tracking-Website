export class MovieData {
  public filmId: number;

  public favourite: boolean;

  constructor(filmId: number, favourite: boolean) {
    this.filmId = filmId;
    this.favourite = favourite;
  }
}
