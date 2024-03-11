import { AppRootStateType } from "app/state/store";

export const todoSelector = (state: AppRootStateType) => state.todolists;
