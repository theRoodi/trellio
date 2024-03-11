import { AppRootStateType } from "app/state/store";

export const isInitializedSelector = (state: AppRootStateType) => state.app.isInitialized;
