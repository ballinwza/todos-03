import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState : string = 'all'

const filterSlice =createSlice({
    name:'filter',
    initialState,
    reducers: {
        setTodosFilter(state,action : PayloadAction<string>){
            return action.payload.toString().toLowerCase()
        }
    }
})

export const {setTodosFilter} = filterSlice.actions
export default filterSlice.reducer