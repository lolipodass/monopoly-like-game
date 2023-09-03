import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BoardActions {
    player: number,
    cell: number,
    level: number
}

//[PlayerWhoBuy,level]
const initialState = new Array(40);
for (let i = 0; i < initialState.length; i++) {
    initialState[i] = [-1, 0];
}

export const BoardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        changeCell: (state, actions: PayloadAction<BoardActions>) => {
            const action = actions.payload;
            state[action.cell][0] = action.player;
            if (action.level > 0)
                state[action.cell][1] = action.level;
        }
    }

})

export const { changeCell } = BoardSlice.actions

export default BoardSlice.reducer 