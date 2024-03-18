import { appActions } from "app/app-reducer";
import { handleServerNetworkError } from "common/utils/handleServerNetworkError";
import { todoActions } from "features/TodolistsList/model/todo/todolists-slice";
import { createSlice } from "@reduxjs/toolkit";
import { RESULT_CODE, tasksActions } from "features/TodolistsList/model/task/tasks-slice";
import { createAppAsyncThunk, handleServerAppError } from "common/utils";
import { authAPI } from "features/auth/api/authApi";
import { thunkTryCatch } from "common/utils/thunk-try-catch";
import { LoginDataType } from "features/auth/lib/useLogin";

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(me.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      });
  },
});
export const me = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(`${slice.name}/me`, async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatus({ status: "loading" }));

  try {
    const res = await authAPI.me();
    if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
      dispatch(appActions.setAppStatus({ status: "successed" }));
      return { isLoggedIn: true };
    } else {
      // handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (e) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  } finally {
    dispatch(appActions.setAppStatus({ status: "successed" }));
    dispatch(appActions.setIsInitialized({ isInitialized: true }));
  }
});
export const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginDataType>(
  `${slice.name}/login`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authAPI.login(arg);
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        return { isLoggedIn: true };
      } else {
        handleServerAppError(res.data, dispatch, false);
        return rejectWithValue(res.data);
      }
    });
  },
);

export const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
  `${slice.name}/logout`,
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authAPI.logout();
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(todoActions.clearTodosData({}));
        dispatch(tasksActions.clearTasks({}));
        return { isLoggedIn: false };
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    });
  },
);
export const authReducer = slice.reducer;
export const authThunks = { login, logout, me };
