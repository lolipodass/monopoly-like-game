import { Message } from "@/types/Message";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: Message[] = []

export const MessagesSlice = createSlice({
    name: 'Messages',
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<Message>) => {
            state.push(action.payload)
        },
    }

})

export const { addMessage } = MessagesSlice.actions

export default MessagesSlice.reducer 