import { useState, useRef, useEffect } from "react"
import { useAppSelector } from "@/hooks/useApp"
export default () =>{
    const [p, setP] = useState(0) 
    const todos = useAppSelector(state=>state.todos)
    const countTodo = useRef(0)
    const progress = todos.map(item=>item.isCheck === true ? 1 : 0) 

    const calProgress = () =>{ 
        if(progress !== 0){
          let getPercent = (100/progress.length) 
          let totalPercent = progress.map((item)=>item === 0? 0 : getPercent)
          if(totalPercent.length !== 0){
            let sum = totalPercent.reduce((total, val)=>{return total + val}) 
            setP(parseInt(sum))
          }else{ 
            setP(parseInt(0))
          } 
        }
    }

    const counting = () =>{
        let sum = progress.reduce((total, val)=>{return total + val}) 
        countTodo.current = sum
      }
  
      useEffect(()=>{
        calProgress() 
        if(progress.length != 0){
            counting()
        }
      },[todos]) 
    
    
    return(
        <div className="a">
            <h1>Progress</h1>
            <div className="progressbar"> 
                <div className="color" style={{width: `${p}%`}}></div> 
            </div> 
            <p>{countTodo.current} completed</p>

            <style jsx>{`
            .a{
                background-color:green;
            }
            .progressbar{
                position: relative;
                height: 7.34px;
                width: 100%; 
                border-radius: 100px; 
                background-color: red; 
            
                .color{
                    position: absolute;
                    background-color: black; 
                    height: 7.34px;
                    border-radius: 100px; 
                    transition: all .5s ease-out;
                } 
            } 
            `}

            </style>
      </div>
    )
}