import { AppRootStateType } from "state/store";

export const statusSelector = (state: AppRootStateType) => state.app.status;
export const isLoggedInSelector = (state: AppRootStateType) => state.auth.isLoggedIn;
