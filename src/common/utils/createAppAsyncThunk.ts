import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatchType, AppRootStateType } from "app/state/store";
import { BaseResponseType } from "types/responce.types";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootStateType;
  dispatch: AppDispatchType;
  rejectValue: null | BaseResponseType;
}>();
