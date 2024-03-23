import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {AxiosError} from "axios";

import { apiKey } from '../../constants';
import { moviesService } from '../../services';
import {IMovie, IMovieInfo} from "../../interfaces";

interface MovieState {
    popularMovies: IMovie[];
    movieInfo: IMovieInfo | null;
}

const initialState: MovieState = {
    popularMovies: [],
    movieInfo: null,
};

export const fetchPopularMovies = createAsyncThunk(
    'movies/fetchPopularMovies',
    async () => {
        const response = await moviesService.get(`/movie/popular?api_key=${apiKey}&language=uk-UA`);
        return response.data.results as IMovie[];
    }
);

export const fetchMovieInfo = createAsyncThunk(
    'movies/fetchMovieInfo',
    async (id: string, { rejectWithValue }) => {
        try {
            const {data} = await moviesService.get(`/movie/${id}?api_key=${apiKey}&language=uk-UA`);
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
            .addCase(fetchPopularMovies.fulfilled, (state, action) => {
                state.popularMovies = action.payload;
            })
            .addCase(fetchMovieInfo.fulfilled, (state, action) => {
                state.movieInfo = action.payload;
            });
    },
});

const moviesReducer = movieSlice.reducer;

export { moviesReducer };
