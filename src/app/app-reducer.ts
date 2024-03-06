import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type RequestStatusType = "idle" | "loading" | "successed" | "failed";

const slice = createSlice({
  name: "app",
  initialState: {
    status: "loading" as RequestStatusType,
    error: null as null | string,
    isInitialized: false,
  },
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: null | string }>) => {
      state.error = action.payload.error;
    },
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status;
    },
    setIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized;
    },
  },
});

export const appActions = slice.actions;
export const appReducer = slice.reducer;
