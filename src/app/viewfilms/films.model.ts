export class Films {
  public original_title: string;

  public id: number;

  public genres: Array<any>;

  public overview: string;

  public popularity?: number;

  public release_date?: Date;

  public video?: Array<any>;

  public poster_path?: string;

  public vote_average?: number;

  constructor(
    original_title?: string,
    id?: number,
    genres?: Array<any>,
    overview?: string,
    popularity?: number,
    release_date?: Date,
    video?: Array<any>,
    poster_path?: string,
    vote_average?: number
  ) {
    this.original_title = original_title;
    this.id = id;
    this.genres = genres;
    this.overview = overview;
    this.popularity = popularity;
    this.release_date = release_date;
    this.video = video;
    this.poster_path = poster_path;
    this.vote_average = vote_average;
  }
}
