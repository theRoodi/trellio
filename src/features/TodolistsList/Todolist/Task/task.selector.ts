import { AppRootStateType } from "app/state/store";

export const taskSelector = (state: AppRootStateType) => state.tasks;
