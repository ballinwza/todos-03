import {configureStore} from '@reduxjs/toolkit'
import todosReducer from '@/store/todolistSlice'
// import { testSlice } from './testSlice'

export const store = configureStore({
    reducer: {
        todos : todosReducer,
        // [testSlice.reducerPath]: testSlice.reducer
    },
    // middleware: (getDefaultMiddleware)=>{
    //     return getDefaultMiddleware().concat(testSlice.middleware)
    // }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>