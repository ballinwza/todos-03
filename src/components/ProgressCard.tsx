import { useState, useRef, useEffect } from "react"
import { TaskListProp } from "@/store/todolistSlice"

interface Props {
    todos: TaskListProp[]
}
export default (props: Props) =>{
    const {todos} = props

    const [percent, setPercent] = useState(0)
    const countTodo = useRef(0)
    const progress : number[] = todos != null ?  todos.map(item=>item.isCheck? 1 : 0): [0]

    useEffect(()=>{
      calProgress()
      if(progress.length != 0){
          counting()
      }
    },[todos])


    const calProgress = () =>{
      if(progress.length !== 0){
        let getPercent = (100/progress.length)
        let totalPercent = progress.map((item)=>item === 0? 0 : getPercent)

        if(totalPercent.length !== 0){
          let sum:number = totalPercent.reduce(sumValue)
          setPercent(sum)
        }else{
          setPercent(0)
        }
      }
    }

    const counting = () =>{
      let sum = progress.reduce((total, val)=>{return total + val})
      countTodo.current = sum
    }

    const sumValue = (total:number, number:number)=>{
      return total+number
    }

    return(
      <div className="progressCard-container">
        <h1>Progress</h1>
        <div className="progressBar">
            <div style={{width: `${percent}%`}}></div>
        </div>
        <p>{countTodo.current} completed</p>
      </div>
    )
}