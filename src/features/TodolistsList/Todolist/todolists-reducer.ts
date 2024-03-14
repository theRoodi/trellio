import {
  CreateTodoArgs,
  RemoveTodoArg,
  todolistsAPI,
  TodolistType,
  UpdateTodoArg,
} from "features/TodolistsList/api/todolists-api";
import { appActions, RequestStatusType } from "app/app-reducer";
import { handleServerNetworkError } from "common/utils/handleServerNetworkError";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RESULT_CODE, tasksThunks } from "features/TodolistsList/Todolist/Task/tasks-reducer";
import { createAppAsyncThunk, handleServerAppError } from "common/utils";
import { thunkTryCatch } from "common/utils/thunk-try-catch";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};

const slice = createSlice({
  name: "todolists",
  initialState: [] as TodolistDomainType[],
  reducers: {
    changeTodolistFilter: (state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) {
        state[index].filter = action.payload.filter;
      }
    },
    setEntityStatus: (state, action: PayloadAction<{ id: string; entity: RequestStatusType }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) {
        state[index].entityStatus = action.payload.entity;
      }
    },
    setTodos: (state, action: PayloadAction<{ todos: TodolistType[] }>) => {
      return action.payload.todos.map((t) => ({
        ...t,
        filter: "all",
        entityStatus: "idle",
      }));
    },
    clearTodosData: (state, action) => {
      return [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodo.fulfilled, (state, action) => {
        const newTodo: TodolistDomainType = {
          ...action.payload.todo,
          filter: "all",
          entityStatus: "idle",
        };
        state.unshift(newTodo);
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) state.splice(index, 1);
      })
      .addCase(changeTodolistTitle.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) {
          state[index].title = action.payload.title;
        }
      });
  },
});
export const setTodosTC = () => (dispatch: any) => {
  dispatch(appActions.setAppStatus({ status: "loading" }));
  todolistsAPI
    .getTodolists()
    .then((res) => {
      dispatch(todoActions.setTodos({ todos: res.data }));
      dispatch(appActions.setAppStatus({ status: "successed" }));
      return res.data;
    })
    .then((todos) => {
      todos.forEach((tl) => {
        dispatch(tasksThunks.getTasks(tl.id));
      });
    })
    .catch((e) => {
      handleServerNetworkError(e, dispatch);
    });
};

export const addTodo = createAppAsyncThunk<{ todo: TodolistType }, CreateTodoArgs>(
  `${slice.name}/addTodo`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      const res = await todolistsAPI.createTodolist(arg.title);
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        const todo = res.data.data.item;
        return { todo };
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    });
  },
);
export const removeTodo = createAppAsyncThunk<RemoveTodoArg, RemoveTodoArg>(
  `${slice.name}/removeTodo`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      dispatch(todoActions.setEntityStatus({ id: arg.id, entity: "loading" }));
      const res = await todolistsAPI.deleteTodolist(arg.id);
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(todoActions.setEntityStatus({ id: arg.id, entity: "successed" }));
        return { id: arg.id };
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    });
  },
);
export const changeTodolistTitle = createAppAsyncThunk<UpdateTodoArg, UpdateTodoArg>(
  `${slice.name}/changeTitle`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      const res = await todolistsAPI.updateTodolist(arg.id, arg.title);
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        return { id: arg.id, title: arg.title };
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    });
  },
);

export const todoReducer = slice.reducer;
export const todoActions = slice.actions;
export const todoThunks = { addTodo, removeTodo, changeTodolistTitle };
