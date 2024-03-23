import React, { FC, useEffect, useState } from 'react';
import { Chip } from "@material-ui/core";

import css from './Genres.module.css';
import { useDispatch, useSelector } from "react-redux";
import { IMovie } from "../../interfaces";
import { fetchGenreMovies, fetchGenresList, RootState, store } from "../../store";

interface GenresProps {
    onClose: () => void;
}

const Genres: FC<GenresProps> = ({ onClose }) => {
    const dispatch = useDispatch();

    const genreMovies: IMovie[] = useSelector((state: RootState) => state.movie.genresMovies);
    const genreList: IMovie[] = useSelector((state: RootState) => state.movie.genresList);

    useEffect(() => {
        store.dispatch(fetchGenreMovies());
    }, [dispatch]);

    useEffect(() => {
        store.dispatch(fetchGenresList());
    }, [dispatch])


    return (
        <div style={{ padding: '10px 0' }} className={css.genres_content}>
                <Chip
                    style={{ fontSize: '1.2rem', margin: '3px' }}
                    label={'Genres'}
                    color='secondary'
                />
            ))
            <button className={css.close_button} onClick={onClose}>Закрити</button>
        </div>
    );
};

export { Genres };
