import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TaskListProp {
    id: string
    content: string
    isCheck: boolean
    isOption: string
    date: Date
}

interface DateObject {
    date: string;
}

type Props = TaskListProp[]

const initialState : Props = []

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers : {
        getAllTodos(state,action){
            action.payload.sort((a:DateObject,b:DateObject)=>{
                const dateA = new Date(a.date)
                const dateB = new Date(b.date)

                return dateA.getTime() - dateB.getTime()
            })

            return action.payload
        },
        checkOption(state, action : PayloadAction<{index:number, isOption:string}>){
            const index = action.payload.index
            const option = action.payload.isOption
            return [
                ...state.slice(0, index),
                {...state[index], isOption: option},
                ...state.slice(index+1)
            ]
        }
    }
})

export const {getAllTodos, checkOption } = todoSlice.actions
export type checkOptionType = typeof checkOption
export type getAllTodosType = typeof getAllTodos
export default todoSlice.reducer