import { AppRootStateType } from "state/store";

export const taskSelector = (state: AppRootStateType) => state.tasks;
