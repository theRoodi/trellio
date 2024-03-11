import { AppRootStateType } from "app/state/store";

export const errorSelector = (state: AppRootStateType) => state.app.error;
