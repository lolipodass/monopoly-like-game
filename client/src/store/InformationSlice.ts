import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InformationState {
    company: number
    position: number
    active: boolean
}

const initialState: InformationState = {
    company: 0,
    position: 0,
    active: false
}

export const InformationSlice = createSlice({
    name: 'information',
    initialState,
    reducers: {
        activate: (state, action: PayloadAction<number>) => {
            state.active = true
            state.company = action.payload
        },
        deactivate: (state) => {
            state.active = false
        },
    },
})

export const { activate, deactivate } = InformationSlice.actions

export default InformationSlice.reducer 