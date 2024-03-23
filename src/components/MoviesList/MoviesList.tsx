import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { RootState, store } from "../../store";
import { fetchUpcomingMovies } from "../../store";
import css from './MoviesList.module.css';
import { IMovie } from "../../interfaces";
import pagination_left_icon from "../../images/SVG/pagonation_left_icon.svg";
import pagination_right_icon from "../../images/SVG/pagination_right_icon.svg";

const MoviesList = () => {
    const dispatch = useDispatch();
    const upcomingMovies: IMovie[] = useSelector((state: RootState) => state.movie.upcomingMovies);
    const [currentPage, setCurrentPage] = useState(1);
    const [isHovered, setIsHovered] = useState(false);
    const moviesPerPage = 5;

    useEffect(() => {
        store.dispatch(fetchUpcomingMovies());
    }, [dispatch]);

    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = upcomingMovies.slice(indexOfFirstMovie, indexOfLastMovie);

    const prevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const nextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(upcomingMovies.length / moviesPerPage)));
    };

    // const handleMouseEnter = () => {
    //     setIsHovered(true);
    // };
    //
    // const handleMouseLeave = () => {
    //     setIsHovered(false);
    // };
    //
    // const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    //     if (isHovered) {
    //         if (event.deltaY > 0) {
    //             nextPage();
    //         } else {
    //             prevPage();
    //         }
    //     }
    // };

    return (
        <div className={css.paginationContainer}>
            <div><h2 className={css.title_movies_list}>Тренд дня</h2></div>
            <div className={css.moviesList}
                 // onMouseEnter={handleMouseEnter}
                 // onMouseLeave={handleMouseLeave}
                 // onWheel={handleScroll}
            >
                <button onClick={prevPage} style={{ visibility: currentPage === 1 ? "hidden" : "visible" }}>
                    <img
                        className={css.pagination_icon}
                        src={pagination_left_icon}
                        alt="pagination_icon"
                    />
                </button>

                {currentMovies && currentMovies.map((movie: IMovie) => (
                    <Link to={`/movie/${movie.id}`} key={movie.id} className={css.movieLink}>
                        <div className={css.list_item}>
                            <img
                                src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`}
                                alt={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`}
                                className={css.list_image}
                            />

                            <div className={css.cards__overlay}>
                                <div className={css.card__title}>{movie?.original_title}</div>
                                <div className={css.card__runtime}>
                                    {movie?.release_date}
                                    <span className={css.card__rating}>{movie?.vote_average}<i className="fas fa-star"/></span>
                                </div>
                                <div className={css.card__description}>{movie?.overview.slice(0, 118) + "..."}</div>
                            </div>

                        </div>

                    </Link>
                ))}
                <button onClick={nextPage}
                        style={{visibility: currentPage === Math.ceil(upcomingMovies.length / moviesPerPage) ? "hidden" : "visible"}}>
                    <img
                        className={css.pagination_icon}
                        src={pagination_right_icon}
                        alt="pagination_icon"
                    />
                </button>
            </div>
        </div>
    );
};

export {MoviesList};
