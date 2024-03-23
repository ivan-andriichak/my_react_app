import {createBrowserRouter} from "react-router-dom";

import {MainLayout} from "./layouts";
import {HomePage, MovieInfoPage} from "./pages";
// import {MovieInfo, MovieListCards} from "./components";
// import {ErrorPage, HomePage} from "./pages";

const router = createBrowserRouter([
    {
        path: '', element: <MainLayout/>, children: [
            {
                index: true, element: <HomePage/>
             },
            {
                path: 'movie/:id', element: <MovieInfoPage/>
            }
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

