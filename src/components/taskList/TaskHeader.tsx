import { setTodosFilter } from '@/store/filterSlice'
import { AppDispatch } from '@/store/store'

interface Props{
    dispatch : AppDispatch
}

export default (props:Props) => {
    const {dispatch} = props
    
    return(
        <div className="taskHeader-container">
            <div>Tasks</div>
            <div>
                <select onChange={(e)=>{dispatch(setTodosFilter(e.currentTarget.value))}}>
                    <option value="all" >All</option>
                    <option value="done">Done</option>
                    <option value="undone">Undone</option>
                </select>
            </div>
        </div>
    )
}