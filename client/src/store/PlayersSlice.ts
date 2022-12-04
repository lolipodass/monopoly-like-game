import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PlayerInformation {
    name: string
    position: number,
    money: number
    companies: [Company?],
}

export interface Company {
    position: number,
    price: number
}

const initialState: PlayerInformation[] = [
    {
        name: "me",
        position: 0,
        money: 1500,
        companies: []
    }
]

export const PlayerSlice = createSlice({
    name: 'players',
    initialState,
    reducers: {
        addCompany: (state, action: PayloadAction<Company>) => {
            state[0].companies.push(action.payload);
        },
        addPlayer: (state, action: PayloadAction<PlayerInformation>) => {
            state.push(action.payload);
        },
        resetPlayers: () => initialState
    }

})

export const { addCompany, addPlayer, resetPlayers } = PlayerSlice.actions

export default PlayerSlice.reducer 