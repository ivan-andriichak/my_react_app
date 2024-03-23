import {configureStore} from "@reduxjs/toolkit";

import {moviesReducer} from "./slices";


let store = configureStore({
    reducer: {
        movie: moviesReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export {store}