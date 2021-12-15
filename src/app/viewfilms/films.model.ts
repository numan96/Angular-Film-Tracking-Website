export class Films {
  public original_title: string;

  public id: number;

  public genres: Array<any>;

  public overview: string;

  public popularity?: number;

  public release_date?: Date;

  public videos?: any;

  public poster_path?: string;

  public vote_average?: number;

  public runtime?: any;

  public credits?: any;

  public crew?: any;

  constructor(
    original_title?: string,
    id?: number,
    genres?: Array<any>,
    overview?: string,
    popularity?: number,
    release_date?: Date,
    videos?: any,
    poster_path?: string,
    vote_average?: number,
    runtime?: any,
    credits?: any,
    crew?: any
  ) {
    this.original_title = original_title;
    this.id = id;
    this.genres = genres;
    this.overview = overview;
    this.popularity = popularity;
    this.release_date = release_date;
    this.videos = videos;
    this.poster_path = poster_path;
    this.vote_average = vote_average;
    this.runtime = runtime;
    this.credits = credits;
    this.crew = crew;
  }
}
