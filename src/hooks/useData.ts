import { db, path } from "@/connector/db"
import { onValue, ref, off, DataSnapshot } from "firebase/database"
import { useEffect } from "react"
import { TaskListProp } from "@/store/todolistSlice"
import { AppDispatch } from "@/store/store"
import { ActionCreatorWithPayload } from "@reduxjs/toolkit"

export const useData = (dispatch : AppDispatch, dispatchAction: ActionCreatorWithPayload<any>) => {

    useEffect(()=>{
        const abortController = new AbortController()
        const signal = abortController.signal
        const query = ref(db, path)

        const listener = (snapshot:DataSnapshot)=>{
            const newDataObject: TaskListProp[] = []
            if(snapshot.exists()){
                Object.keys(snapshot.val()).forEach((item)=>{
                    newDataObject.push(snapshot.val()[item])
                })
                dispatch(dispatchAction(newDataObject))
            }else{
                console.log("Don't have data")
                dispatch(dispatchAction(newDataObject))
            }
        }

        onValue(query, listener), 
        (error : any) => {
            console.log(error, 'something wrong')
        },{
            cancelIdleCallback : signal
        }

        return ()=>{
            off(ref(db, path),undefined, listener)
            abortController.abort()
        }
    },[])

}