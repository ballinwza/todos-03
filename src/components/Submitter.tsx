import React, { KeyboardEvent } from "react"
import { createProps } from "@/connector/crud"
import { v4 as uuid } from "uuid"

interface SubmitProps {
    createTodo: createProps
    placeholder:string
}

const Submitter = (props:SubmitProps) =>{
    const {createTodo,placeholder} = props

    const handleClick = (e : KeyboardEvent<HTMLInputElement>) =>{
        const content : string = e.currentTarget.value.toString()
        if(e.key === 'Enter' && e.currentTarget.value != ''){
            createTodo(content, uuid())
            e.currentTarget.value = ''
        }
    }

    return(
        <div className="submitter-container">
            <input type='text' onKeyDown={(e)=>{handleClick(e)}} placeholder={placeholder}/>
        </div>
    )
}

export default Submitter