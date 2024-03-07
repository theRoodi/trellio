import { AppRootStateType } from "state/store";

export const todoSelector = (state: AppRootStateType) => state.todolists;
