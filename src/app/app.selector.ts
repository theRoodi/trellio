import { AppRootStateType } from "state/store";

export const isInitializedSelector = (state: AppRootStateType) => state.app.isInitialized;
