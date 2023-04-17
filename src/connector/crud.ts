import { db , path} from "./db";
import {ref,set,update, remove} from 'firebase/database'
import { TaskListProp } from "@/store/todolistSlice";

export type createProps = typeof createTodo
export const createTodo = async (content: string, uuid:string) => {
    return await set(ref(db, `${path}/${uuid}`),{
        id: uuid,
        content: content,
        isCheck: false,
        isOption: 'default',
        date: new Date().toISOString()
    })
}

export type UpdateProps = typeof updateTodo
export const updateTodo = async (item:TaskListProp ,content:string|undefined, isCheck:boolean|undefined) =>{
    const postData : TaskListProp = {
        id: item.id,
        content: content == undefined? item.content : content,
        isCheck: isCheck == undefined ? item.isCheck : isCheck,
        isOption: 'default',
        date: item.date
    }
    const updates:any  = {}
    updates[`/${path}/`+ item.id] = postData
    console.log('updates')
    return await update(ref(db), updates)
}

export type DeleteProps = typeof deleteTodo
export const deleteTodo = async (id:string) =>{
   return await remove(ref(db,`${path}/${id}`))
}