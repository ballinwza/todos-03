import { useState } from "react"
import { TaskListProp } from "@/store/todolistSlice"
import { KeyboardEvent, MouseEvent, ChangeEvent } from "react"
import { AppDispatch } from "@/store/store"
import { UpdateProps } from "@/connector/crud"
import { checkOptionType } from "@/store/todolistSlice"

interface Param {
    keyDownEvent: KeyboardEvent<HTMLInputElement>
    clickEvent: MouseEvent<HTMLButtonElement>
    changeEvent: ChangeEvent<HTMLInputElement>
    index: number
    isOption : string
}

interface Props{
    className: string
    item: TaskListProp
    dispatch: AppDispatch
    dispatchAction: checkOptionType
    updateTodo: UpdateProps
    index: number
    placeholder: string
}

export default (props: Props) =>{
    const {className, item, dispatch, dispatchAction, updateTodo, index, placeholder} = props
    const [inputValue, setInputValue] = useState<string[]>([])

    const handleSubmitByClick = (e:Param['clickEvent'],item:TaskListProp,index:Param['index'])=>{
        const isOption = 'default'
        dispatch(dispatchAction({index, isOption}))

         if(inputValue[index] != '' && inputValue[index] != undefined && inputValue[index] != null){
            updateTodo(item, inputValue[index],  undefined)
            getInputValue('',index)
        }
    }

    const handleSubmitByEnter = (e:Param['keyDownEvent'],item:TaskListProp,index:Param['index']) =>{
        const content:string = e.currentTarget.value.toString()
        const isOption = 'default'

        if('key' in e){
            if(e.key === 'Enter' && e.currentTarget.value != '' ){
                updateTodo(item, content,  undefined)
                getInputValue('',index)
            }
            if(e.key === 'Enter'){
                dispatch(dispatchAction({index, isOption}))
            }
        }
    }

    const handleChangeInputValue = (e:Param['changeEvent'], index:Param['index']) =>{
        getInputValue(e.currentTarget.value,index)
    }

    const getInputValue = (newValue:string, index:Param['index']) =>{
        const newInputValue: string[] = [...inputValue]
        newInputValue[index] = newValue
        setInputValue(newInputValue)
    }

    return(
        <div className={className}>
            <div>
                <input
                    type="text"
                    value={inputValue[index] == undefined ? '' : inputValue[index]}
                    onKeyDown={(e)=>handleSubmitByEnter(e,item,index)} onChange={(e)=>handleChangeInputValue(e,index)}
                    placeholder={placeholder}
                    name={item.id}
                />
            </div>
            <div>
                <button onClick={(e)=>handleSubmitByClick(e,item,index)}>Save</button>
            </div>
        </div>
    )
}