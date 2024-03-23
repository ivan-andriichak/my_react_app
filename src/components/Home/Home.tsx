import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import css from './Home.module.css';
import {fetchPopularMovies, RootState, store} from "../../store";
import {IMovie} from "../../interfaces";


const Home: FC = () => {

    const dispatch = useDispatch();
    const popularMovies: IMovie[] = useSelector((state: RootState) => state.movie.popularMovies);

    useEffect(() => {
        store.dispatch(fetchPopularMovies());
    }, [dispatch]);
// ________________________________________________________



    // const { darkTheme, movies } = useAppSelector((state) => state);

//     const [searchMovie, setSearchMovie] = useState("");
//
//
//     const searchMovies = movies.data?.results.filter((movie) => {
//         return movie.title.toLowerCase().includes(searchMovie);
//     });

    // const handleSearch = () => {
    //     dispatch(searchMovies(searchQuery)); // Виклик функції пошуку фільмів з введеним пошуковим запитом
    // };


    // __________________________________________________________

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
                    popularMovies.map((movie: IMovie) => (
                        <Link to={`/movie/${movie.id}`} key={movie.id} style={{textDecoration: 'none', color: 'white'}}>

                            <div className={css.posterImage}>
                                <img
                                    src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`}
                                    alt={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`}
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
            {/*________________________________________________*/}





            {/*          <div className={darkTheme.theme ? "dark" : ""}>
      <div className="dark:bg-red-900 dark:text-white min-h-screen px-4 lg:px-12 pb-20">
        <div className="mb-12 flex items-center justify-between">
          <SearchMovie searchMovie={searchMovie} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {searchMovies && searchMovies.length ? (
            searchMovies.map((movie) => {
              const { id, title, overview, poster_path } = movie;
              return <MovieCard key={id} id={id} title={title} overview={overview} poster_path={poster_path} />;
            })
          ) : (
            <h4>No Movie Found</h4>
          )}
        </div>
      </div>
      <Outlet />
    </div>
{/*___________________________________________________*/}

            {/*<SearchMovie setSearchMovie={}*/}
        </div>
    );
};

export {Home};
