export interface ClubResponse {
  count: number;
  next: null;
  previous: null;
  results: ClubResult[];
}

export interface ClubResult {
  club: string;
}
