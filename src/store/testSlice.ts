// import { createApi, fetchBaseQuery, fakeBaseQuery } from "@reduxjs/toolkit/query/react"
// import { db } from "@/connector/db"
// import {ref,set,get,child} from 'firebase/database'

// export interface tProps {
//     id: string
//     content: string
//     isCheck: boolean
// }

// const APIKEY = 'AIzaSyCRhp6q0KI83BUmnhFfO4gyeXdj7w7MwLw'

// export const testSlice = createApi({
//     reducerPath: 'api',
//     baseQuery: fakeBaseQuery(),
//     tagTypes: ["Post"],
//     endpoints: (builder) => ({
//         getTodos: builder.query<tProps[], string | void>({
            
//         })
//     })
// })

// export const {useFetchTodosQuery} = testSlice