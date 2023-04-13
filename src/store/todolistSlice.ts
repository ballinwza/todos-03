import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import React from "react";
import {write, updated, deleted} from '@/connector/callDb'
import { v4 } from "uuid";
export interface TaskListProp {
    id: string
    content: string
    isCheck: boolean
}

type Props = TaskListProp[]

const initialState : Props = []

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers : {
        addTodo(state, action : PayloadAction<{content: string}>) {
            const uuid = v4()
            write(action.payload.content, uuid)
            return [
                ...state,
                {
                    id: uuid,
                    content: action.payload.content,
                    isCheck: false
                }
            ]
        },
        updateContentTodo(state, action : PayloadAction<{index:number, value:string}>){
            const index = action.payload.index
            const arrayData = [
                ...state.slice(0,index),
                {...state[index], content : action.payload.value},
                ...state.slice(index + 1)
            ]
            updated(index, arrayData)
            return arrayData
        },
        checkTodo(state, action : PayloadAction<{index:number}>){
            const index = action.payload.index
            return [
                ...state.slice(0,index),
                {...state[index], isCheck: state[index].isCheck ? false : true},
                ...state.slice(index + 1)
            ]
        },
        deleteTodo(state,action : PayloadAction<{index:number, id:string}>){
            const index = action.payload.index
            deleted(action.payload.id)
            return [
                ...state.slice(0,index),
                ...state.slice(index + 1)
            ]
        },
        getAllTodos(state,action){
            return action.payload
        }
    }
})

export const { addTodo, updateContentTodo, checkTodo, deleteTodo, getAllTodos } = todoSlice.actions
export type addTodoType = typeof addTodo
export type updateTodoType = typeof updateContentTodo
export default todoSlice.reducer