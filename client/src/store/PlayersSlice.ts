import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PlayerInformation {
    name: string
    position: number,
    money: number
}

export interface Company {
    position: number,
    price: number
}

export interface ChangeInformation {
    value: number,
    player: number
}


const initialState: PlayerInformation[] = []

export const PlayersSlice = createSlice({
    name: 'players',
    initialState,
    reducers: {
        addPlayer: (state, action: PayloadAction<PlayerInformation>) => {
            state.push(action.payload);
        },
        removePlayer: (state, action: PayloadAction<number>) => {
            state.splice(action.payload, 1);
        },
        changePosition: (state, action: PayloadAction<ChangeInformation>) => {
            const player = action.payload.player
            state[player].position += action.payload.value;
            if (state[player].position >= 40)
                state[player].position -= 40;
        },
        changeMoney(state, action: PayloadAction<ChangeInformation>) {
            state[action.payload.player].money = action.payload.value
        },
        resetPlayers: () => initialState
    }

})

export const { addPlayer, resetPlayers, changePosition, changeMoney, removePlayer } = PlayersSlice.actions

export default PlayersSlice.reducer 