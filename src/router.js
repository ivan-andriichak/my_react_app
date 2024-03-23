import {createBrowserRouter} from "react-router-dom";

import {MainLayout} from "./layouts";
import {HomePage, MovieInfoPage, MoviesListPage,ErrorPage} from "./pages";

const router = createBrowserRouter([
    {
        path: '', element: <MainLayout/>, children: [
            {
                index: true, element: <HomePage/>
             },
            {
                path: 'movie/:id', element: <MovieInfoPage/>
            },
            {
                path: 'movies/:type', element: <MoviesListPage/>
            },
            {
                path: '/*', element: <ErrorPage/>
            }
        ]
    }
]);

export {
    router
};

