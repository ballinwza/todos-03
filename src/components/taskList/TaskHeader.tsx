import { setTodosFilter } from '@/store/filterSlice'
import { AppDispatch } from '@/store/store'
import { useRef, useState } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"
import { filterType } from '@/store/filterSlice'

interface Props{
    dispatch : AppDispatch
    filter: filterType
}

export default (props:Props) => {
    const {dispatch, filter} = props
    const textFilterRef = useRef<HTMLParagraphElement>(null)
    const [toggle, setToggle] = useState<string>('hidden')
    
    const handleClick = (e:React.MouseEvent,text:filterType) =>{
        if(textFilterRef.current){
            textFilterRef.current.innerHTML= text
            dispatch(setTodosFilter(e.currentTarget.innerHTML))
            setToggle('hidden')
        }
    }

    const handleMouseOut = () =>{ setToggle('hidden') }

    const activeStyle = (param:string) =>{
        if(filter == param){
            return 'active'
        }else{
            return ''
        }
    }

    return(
        <div className="taskHeader-container">
            <div><h2>Tasks</h2></div>
            <div>
                <div onClick={()=>{toggle=='hidden'?setToggle('d-block'):setToggle('hidden')}}>
                    <p ref={textFilterRef}>All</p>
                    <p><FontAwesomeIcon icon={faAngleDown}/></p>
                </div>
                <div onMouseLeave={handleMouseOut}>
                    <ul className={toggle} >
                        <li className={activeStyle('all')} onClick={(e)=>handleClick(e,e.currentTarget.innerHTML)}>All</li>
                        <li className={activeStyle('done')} onClick={(e)=>handleClick(e,e.currentTarget.innerHTML)}>Done</li>
                        <li className={activeStyle('undone')} onClick={(e)=>handleClick(e,e.currentTarget.innerHTML)}>Undone</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}