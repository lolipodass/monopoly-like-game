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

export interface ChangePosition {
    number: number,
    player: number
}

const initialState: PlayerInformation[] = [
    {
        name: "me",
        position: 0,
        money: 1500,
        companies: []
    }
]

export const PlayersSlice = createSlice({
    name: 'players',
    initialState,
    reducers: {
        addCompany: (state, action: PayloadAction<Company>) => {
            state[0].companies.push(action.payload);
        },
        addPlayer: (state, action: PayloadAction<PlayerInformation>) => {
            state.push(action.payload);
        },
        removePlayer: (state, action: PayloadAction<number>) => {
            state.splice(action.payload, 1);
        },
        changePosition: (state, action: PayloadAction<ChangePosition>) => {
            state[action.payload.player].position += action.payload.number;
            if (state[0].position >= 40)
                state[0].position = state[0].position - 40;
        },
        resetPlayers: () => initialState
    }

})

export const { addCompany, addPlayer, resetPlayers, changePosition, removePlayer } = PlayersSlice.actions

export default PlayersSlice.reducer 