import { AppRootStateType } from "state/store";

export const errorSelector = (state: AppRootStateType) => state.app.error;
