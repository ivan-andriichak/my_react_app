import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {AxiosError} from "axios";
import {apiKey, baseURL, genresList} from '../../constants';
import {moviesService} from '../../services';
import {IMovie, IMovieInfo} from "../../interfaces";

interface MovieState {
    upcomingMovies: IMovie[];
    genresMovies: IMovie[];
    genresList: IMovie[];
    movieInfo: IMovieInfo | null;
}

const initialState: MovieState = {
    upcomingMovies: [],
    genresMovies:[],
    genresList:[],
    movieInfo: null,
};

export const fetchUpcomingMovies = createAsyncThunk(
    'movies/fetchUpcomingMovies',
    async () => {
        const response = await moviesService.get(`${baseURL}/trending/movie/day?api_key=${apiKey}&language=uk-UA`);
        return response.data.results as IMovie[];
    }
);

export const fetchGenreMovies = createAsyncThunk(
    'movies/fetchGenreMovies',
    async () => {
        const response = await moviesService.get(`${baseURL}/discover/movie?api_key=${apiKey}&include_adult=false&include_video=true&language=uk-UA&page=1&sort_by=popularity.desc`);

            return response.data.results as IMovie[];
    }
);

export const fetchGenresList = createAsyncThunk(
    'movies/fetchGenresList',
    async () => {
        const response = await moviesService.get(` https://api.themoviedb.org/3/genre/movie/list?api_key=e2c4de89936e7c192950789bad4aa81a&include_adult=false&include_video=true&language=uk-UA&page=1`);
        return response.data.results as IMovie[];
        // https://api.themoviedb.org/3/genre/movie/list?api_key=e2c4de89936e7c192950789bad4aa81a&include_adult=false&include_video=true&language=uk-UA&page=1&sort_by=popularity.desc
    }
);

export const fetchMovieInfo = createAsyncThunk(
    'movies/fetchMovieInfo',
    async (id: string, { rejectWithValue }) => {
        try {
            const { data } = await moviesService.get(`${baseURL}/movie/${id}?api_key=${apiKey}&language=uk-UA`);
            return data as IMovieInfo;
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                return rejectWithValue(axiosError.response.data);
            } else {
                throw error;
            }
        }
    }
);

const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
                state.upcomingMovies = action.payload;
            })
            .addCase(fetchGenreMovies.fulfilled, (state, action) => {
                state.genresMovies = action.payload;
            })
            .addCase(fetchGenresList.fulfilled, (state, action) => {
                state.genresList = action.payload;
            })
            .addCase(fetchMovieInfo.fulfilled, (state, action) => {
                state.movieInfo = action.payload;
            });
    },
});

console.log(genresList)
const moviesReducer = movieSlice.reducer;

export { moviesReducer };
