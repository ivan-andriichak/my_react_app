import {createBrowserRouter} from "react-router-dom";

import {MainLayout} from "./layouts";
// import {MovieInfo, MovieListCards} from "./components";
// import {ErrorPage, HomePage} from "./pages";

const router = createBrowserRouter([
    {
        path: '', element: <MainLayout/>, children: [
            // {
            //     index: true, element: <HomePage/>
            // },
            // {
            //     path: 'movie/:id', element: <MovieInfo/>
            // },
            // {
            //     path: 'movies/:type', element: <MovieListCards/>
            // },
            // {
            //     path: '/*', element: <ErrorPage/>
            // }
        ]
    }
]);

export {
    router
};

