import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {Carousel} from 'react-responsive-carousel';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import css from './Home.module.css';
import {fetchUpcomingMovies, RootState, store} from "../../store";
import {IMovie} from "../../interfaces";

const Home: FC = () => {

    const dispatch = useDispatch();
    const upcomingMovies: IMovie[] = useSelector((state: RootState) => state.movie.upcomingMovies);

    useEffect(() => {
        store.dispatch(fetchUpcomingMovies());
    }, [dispatch]);

    return (
        <div className={css.poster}>
            <Carousel
                showThumbs={false}
                autoPlay={true}
                transitionTime={3}
                infiniteLoop={true}
                showStatus={false}
            >
                {
                    upcomingMovies.map((movie: IMovie) => (
                        <Link to={`/movie/${movie.id}`} key={movie.id} style={{textDecoration: 'none', color: 'white'}}>

                            <div className={css.posterImage}>
                                <img
                                    src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`}
                                    alt={`movie.backdrop_path`}
                                />
                            </div>

                            <div className={css.posterImage__overlay}>
                                <div className={css.posterImage__title}>{movie ? movie.original_title : ""}</div>
                                <div className={css.posterImage__runtime}>
                                    {movie ? movie.release_date : ""}
                                    <span className={css.posterImage}>
                                    {movie ? movie.vote_average : ""}
                                </span>
                                </div>
                                <div className={css.posterImage__description}>{movie ? movie.overview : ""}</div>
                            </div>
                        </Link>
                    ))}
            </Carousel>

        </div>
    );
};

export {Home};
