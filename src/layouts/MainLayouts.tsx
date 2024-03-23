import {Outlet} from "react-router-dom";

import {HeaderPage, MoviesListPage} from "../pages";

const MainLayout = () => {
    return (
        <div>
            <HeaderPage/>
            <Outlet/>
            <MoviesListPage/>
        </div>
    );
};

export {MainLayout};