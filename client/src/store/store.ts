import { configureStore } from "@reduxjs/toolkit";
import InformationSlice from "./InformationSlice";
import PlayersSlice from "./PlayersSlice";

export const store = configureStore(
    {
        reducer: {
            InformationSlice,
            PlayersSlice
        },
    }
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch