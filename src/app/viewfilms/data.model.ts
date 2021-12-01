export class MovieData {
  public page?: number;

  public results?: [];

  public total_results?: number;

  public total_pages?: number;

  constructor(page: number, results: [], total_results, total_pages) {
    this.page = page;
    this.results = results;
    this.total_results = total_results;
    this.total_pages = total_pages;
  }
}
