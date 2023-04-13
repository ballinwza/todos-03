import React, { KeyboardEvent } from "react"
import { AppDispatch } from "@/store/store"
import { addTodo } from "@/store/todolistSlice"

interface Props {
    dispatch: AppDispatch
}

export default (props: Props) =>{
    const {dispatch} = props

    const handleClick = (e : KeyboardEvent<HTMLInputElement>) =>{
        const content : string = e.currentTarget.value.toString()
        if(e.key === 'Enter' && e.currentTarget.value != ''){
            dispatch(addTodo({content}))
            e.currentTarget.value = ''
        }
    }

    return(
        <div>
            <input type='text' onKeyDown={(e)=>{handleClick(e)}}/>
        </div>
    )
}