export class MovieData {
  filmId: {
    favourite: boolean;
  };

  constructor(filmId: { favourite: boolean }) {
    this.filmId = filmId;
  }
}
