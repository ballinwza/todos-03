import { Database, ref, get, child } from "firebase/database"
import { TaskListProp, getAllTodos } from "@/store/todolistSlice"
import { AppDispatch } from "@/store/store"
import { useEffect } from "react"

export async function loadTodos(db: Database, path:string, dispatch:AppDispatch) {
    const dbRef = ref(db,path)
    const newDataObject : TaskListProp[] = []

    await get(child(dbRef,path))
    .then((snapshot)=>{
        if(snapshot.exists()){
            Object.keys(snapshot.val()).forEach((item)=>{
                newDataObject.push(snapshot.val()[item])
            })
            // dispatch(getAllTodos(newDataObject))
            console.log('get data')
        }else{
            console.log('get some error in fetcher')
        }
    }).catch((err)=>{
        console.log(err)
    })

    return newDataObject
}