import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

export type DispatchFunc = () => AppDispatch
export const useAppDispatch : DispatchFunc = useDispatch
export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector
