import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import {fetchMovieInfo, RootState} from '../../store';
import css from './MovieInfo.module.css';
import {IMovieInfo} from "../../interfaces";

const MovieInfo: FC = () => {
    const dispatch = useDispatch();

    const movie: IMovieInfo | null = useSelector((state: RootState) => state.movie.movieInfo);

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            dispatch<any>(fetchMovieInfo(id));
            window.scrollTo(0, 0);
        }
    }, [dispatch, id]);


    return (
        <div className={css.movieInfo}>

            {movie && (
                <>
                    <div className={css.movie__intro}>
                        <img
                            className={css.movie__backdrop}
                            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                            alt={`movie_name`}
                        />
                    </div>
                    <div className={css.movie__detail}>
                        <div className={css.movie__detailLeft}>
                            <div className={css.movie__posterBox}>
                                <img
                                    className={css.movie__poster}
                                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                    alt={`movie_name`}
                                />
                            </div>
                        </div>
                        <div>
                            <div className={css.movie__detailRightTop}>
                                <div className={css.movie__name}>{movie.original_title}</div>
                                <div className={css.movie__tagline}>{movie.tagline}</div>
                                <div className={css.movie__rating}>
                                    {movie.vote_average}
                                    <i className={css.fasFaStar}/>
                                    <span className={css.movie__voteCount}>({movie.vote_count} votes)</span>
                                </div>
                                <div className={css.movie__runtime}>{movie.runtime} min</div>
                                <div className={css.movie__releaseDate}>Release date: {movie.release_date}</div>
                                <div className={css.movie__genres}>
                                    {movie.genres.map((genre: { id: number; name: string }) => (
                                        <span className={css.movie__genre} key={genre.id}>{genre.name}</span>
                                    ))}
                                </div>
                            </div>
                            <div className={css.movie__detailRightBottom}>
                                <div className={css.synopsisText}>Огляд</div>
                                <div>{movie.overview}</div>
                            </div>
                        </div>
                    </div>
                    <div className={css.movie__links}>
                        {movie.imdb_id && (
                            <a href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank"
                               rel="noopener noreferrer" style={{textDecoration: "none"}}>
                                <p>
                                    <span className={`${css.movie__imdbButton} ${css.movie__Button}`}>
                                        IMDb <i className={`fas fa-external-link-alt ${css.newTab}`}></i>
                                    </span>
                                </p>
                            </a>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export {MovieInfo};
