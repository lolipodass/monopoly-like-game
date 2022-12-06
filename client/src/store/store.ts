import { configureStore } from "@reduxjs/toolkit";
import InformationSlice from "./InformationSlice";
import PlayersSlice from "./PlayersSlice";
import MessagesSlice from "./MessagesSlice";

export const store = configureStore(
    {
        reducer: {
            InformationSlice,
            PlayersSlice,
            MessagesSlice
        },
    }
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch