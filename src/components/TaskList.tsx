import { TaskListProp } from "@/store/todolistSlice"
import { AppDispatch } from "@/store/store"
import { updateContentTodo, checkTodo, deleteTodo } from "@/store/todolistSlice"
import { KeyboardEvent } from "react"

interface Props{
    todos: TaskListProp[]
    dispatch: AppDispatch
}

export default (props : Props) =>{
    const {todos, dispatch} = props

    const handleChange = (index:number) =>{
        dispatch(checkTodo({index}))
    }

    const handleKeyDown = (e:KeyboardEvent<HTMLInputElement>,index:number) =>{
        const value:string = e.currentTarget.value.toString()
        if(e.key === 'Enter' && e.currentTarget.value != '' ){
            dispatch(updateContentTodo({index, value}))
            e.currentTarget.value = ''
        }
    }

    const handleDelete = (index:number, id:string) =>{
        dispatch(deleteTodo({index,id}))
    }

    return(
        <div>
            {todos.map((item,index)=>{
                return(
                    <div key={index}>
                        <input type='checkbox' checked={item.isCheck} onChange={()=>handleChange(index)}/>
                        {item.content}
                        <input type="text" onKeyDown={(e)=>handleKeyDown(e,index)}/>
                        <button onClick={()=>{handleDelete(index, item.id)}}>Delete</button>
                    </div>
                )
            })}
        </div>
    )
}
