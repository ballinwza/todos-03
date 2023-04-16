import { TaskListProp } from "@/store/todolistSlice"
import { MouseEventHandler } from "react"
import { UpdateProps } from "@/connector/crud"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faEllipsis} from '@fortawesome/free-solid-svg-icons'

interface Props {
    item: TaskListProp
    selectOption: MouseEventHandler<HTMLDivElement>
    updateTodo: UpdateProps
    className: string
}

export default (props:Props) =>{
    const {item, selectOption, updateTodo, className} = props

    const handleChange = (item:TaskListProp) =>{
        updateTodo(item, undefined,  item.isCheck == true ? false : true)
    }

    return(
        <div className={className}>
            <div>
                <label>
                    <input type='checkbox' checked={item.isCheck} onChange={()=>handleChange(item)}/>
                    <span className="checkmark"></span>
                </label>
            </div>
            <div className={`${item.isCheck? 'line-through':''}`}>{item.content}</div>
            <div onClick={selectOption}><FontAwesomeIcon icon={faEllipsis} /></div>
        </div>
    )
}