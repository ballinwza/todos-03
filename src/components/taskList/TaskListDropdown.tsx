import { DeleteProps } from "@/connector/crud"
import { TaskListProp } from "@/store/todolistSlice"
import { MouseEventHandler } from "react"

interface IProps {
    selectOption: MouseEventHandler<HTMLDivElement>
    deleteTodo: DeleteProps
    className: string
    item:TaskListProp
}

const TaskListDropdown = (props:IProps) =>{
    const {selectOption, deleteTodo, className,item} = props

    const handleDelete = (id:string) =>{
        deleteTodo(id)
    }

    return(
        <div className={className}>
            <div onClick={selectOption}>Edit</div>
            <div onClick={()=>{handleDelete(item.id)}}>Delete</div>
        </div>
    )
}

export default TaskListDropdown