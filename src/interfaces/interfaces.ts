export interface IGenre {
    id: number;
    name: string;
}

export interface IMovie {
    id: number;
    backdrop_path: string;
    original_title: string;
    release_date: string;
    vote_average: number;
    overview: string;
    genres?: { id: number; name: string }[];
}

export interface IMovieInfo {
    backdrop_path: string;
    poster_path: string;
    original_title: string;
    tagline: string;
    vote_average: number;
    vote_count: number;
    runtime: number;
    release_date: string;
    genres: { id: number; name: string }[];
    overview: string;
    imdb_id: string;
}

export interface ISearch {
    page: number,
    results: [],
    total_pages: number,
    total_results: 0

}
