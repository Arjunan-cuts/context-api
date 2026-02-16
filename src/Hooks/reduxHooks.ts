import { UseDispatch, useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import { store } from "../redux/store";

export const useAppSelector:TypedUseSelectorHook<ReturnType <typeof store.getState>>=useSelector;
export const useAppDispatch=()=>useDispatch<typeof store.dispatch>();
