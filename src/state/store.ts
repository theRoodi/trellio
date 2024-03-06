import { tasksReducer } from "./tasks-reducer";
import { appReducer } from "app/app-reducer";
import { AnyAction, combineReducers } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { authReducer } from "features/Login/authReducer";
import { configureStore } from "@reduxjs/toolkit";
import { todoReducer } from "state/todolists-reducer";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todoReducer,
  app: appReducer,
  auth: authReducer,
});
export const store = configureStore({
  reducer: rootReducer,
});
export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>;
export const useAppDispatch = useDispatch<AppDispatchType>;
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
// @ts-ignore
window.store = store;
