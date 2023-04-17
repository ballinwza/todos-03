import { TaskListProp } from "@/store/todolistSlice"
import { UpdateProps, DeleteProps } from "@/connector/crud"
import { checkOption } from "@/store/todolistSlice"
import { AppDispatch } from "@/store/store"
import TaskListDropdown from "./TaskListDropdown"
import TaskListSubmitter from "./TaskListSubmitter"
import TaskListCard from "./TaskListCard"
import { useAppSelector } from "@/hooks/useApp"

interface Param {
    index: number
    isOption : string
}

interface Props{
    todos: TaskListProp[],
    deleteTodo: DeleteProps,
    updateTodo: UpdateProps
    dispatch: AppDispatch
}

export default (props : Props) =>{
    const {todos, deleteTodo, updateTodo, dispatch} = props

    const filter = useAppSelector(state=>state.filter)

    const selectOption = (index:Param['index'], isOption: Param['isOption'], id?: string)=>{
        const inputElement = document.querySelector<HTMLInputElement>(`input[name='${id}']`)
        dispatch(checkOption({index, isOption}))
        if (inputElement) {
            setTimeout(()=>{
                inputElement.focus();
            },100)
        }
    }

    const filterTodos = (filterValue:string) =>{
        const newTodos: TaskListProp[] = []

        if(filterValue == 'done'){
            todos.map((item)=>{if(item.isCheck){newTodos.push(item)}})
        }else if(filterValue == 'undone'){
            todos.map((item)=>{if(!item.isCheck){newTodos.push(item)}})
        }else{
            todos.map((item)=>{newTodos.push(item)})
        }

        return (
            <div className="taskList-container">
                {newTodos && newTodos.map((item,index)=>{
                    return(
                        <div key={index}>
                            <TaskListCard
                                className={`taskList-card ${item.isOption == 'default' || item.isOption == 'dropdown' ? 'd-flex':'hidden'}`}
                                selectOption={()=>selectOption(index, `${item.isOption == 'default'?'dropdown':'default'}`)}
                                updateTodo={updateTodo}
                                item={item}
                            />

                            <TaskListDropdown
                                className={`taskList-dropdown ${item.isOption == 'dropdown' ? 'd-block':'hidden'}`}
                                selectOption={()=>selectOption(index, 'edit', item.id)}
                                deleteTodo={deleteTodo}
                                item={item}
                            />

                            <TaskListSubmitter
                                className={`taskList-submitter ${item.isOption == 'edit' ? 'd-flex':'hidden'}`}
                                dispatch={dispatch}
                                dispatchAction={checkOption}
                                updateTodo={updateTodo}
                                index={index}
                                placeholder='Pree Enter to submit or close'
                                item={item}
                            />
                        </div>
                    )
                })}
            </div>
        )
    }

    return(
        <>
            {filterTodos(filter)}
        </>
    )
}
