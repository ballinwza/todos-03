import { loadTodos } from "@/lib/loadTodos"
import { db, path } from "@/connector/db"
import { useAppDispatch } from "./useApp"
import { useEffect } from "react"
import { Database, ref, get, child } from "firebase/database"
import { TaskListProp, getAllTodos } from "@/store/todolistSlice"
import { AppDispatch } from "@/store/store"

export function useFetch (){
    // const data = loadTodos(db, path, useAppDispatch())

    const dispatch = useAppDispatch()
    useEffect(()=>{
        const dbRef = ref(db)
        const newDataObject : TaskListProp[] = []

        get(child(dbRef,path))
        .then((snapshot)=>{
            if(snapshot.exists()){
                Object.keys(snapshot.val()).forEach((item)=>{
                    newDataObject.push(snapshot.val()[item])
                })
                dispatch(getAllTodos(newDataObject))
            }else{
                console.log('get some error in fetcher')
            }
        }).catch((err)=>{
            console.log(err)
        })
    },[])
}