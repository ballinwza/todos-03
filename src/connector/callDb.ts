import { db , path} from "./db";
import {ref,set,get,child, update, remove} from 'firebase/database'
import { TaskListProp } from "@/store/todolistSlice";
import { useAppDispatch, useAppSelector } from '@/hooks/useApp'
import { getAllTodos } from "@/store/todolistSlice";

export const write = async (content: string, uuid:string) => {
    await set(ref(db, `${path}/${uuid}`),{
        id: uuid,
        content: content,
        isCheck: false
    })
}

export const updated = async (index:number,item: TaskListProp[]) =>{
    const postData : TaskListProp = {
        id: item[index].id,
        content: item[index].content,
        isCheck: item[index].isCheck
    }
    const updates:any  = {}
    updates[`/${path}/`+ item[index].id] = postData
    console.log('updates')
    return await update(ref(db), updates)
}

export const deleted = async (id:string) =>{
   return await remove(ref(db,`${path}/${id}`))
}

// const read = () =>{
//     const dispatch = useAppDispatch()
//     const dbRef = ref(db)
//     const nObj : TaskListProp[] = []
//     get(child(dbRef, `${path}`)).then((snapshot)=>{
//         if(snapshot.exists()){
//             Object.keys(snapshot.val()).forEach((item,index)=>{
//                 nObj.push(snapshot.val()[item])
//             })
//             // console.log(nObj)
//             dispatch(getAllTodos(nObj))
//         }else{
//             console.log("no data")
//         }
//     }).catch((err)=>{
//         console.log(err)
//     })
// }

// export default read