import { handleServerNetworkError } from "common/utils/handleServerNetworkError";
import { appActions } from "app/app-reducer";
import { createSlice } from "@reduxjs/toolkit";
import { todoActions, todoThunks } from "features/TodolistsList/model/todo/todolists-slice";
import { createAppAsyncThunk, handleServerAppError } from "common/utils";
import { TaskPriorities, TaskStatuses } from "common/enums/enum";
import { thunkTryCatch } from "common/utils/thunk-try-catch";
import { tasksAPI } from "features/TodolistsList/api/task/tasks-api";
import {
  CreateTaskArgsType,
  RemoveTaskArg,
  TaskType,
  UpdateTaskModelType,
  UpdateTasksArg,
} from "features/TodolistsList/api/task/tasks-api.types";

export enum RESULT_CODE {
  SUCCEEDED = 0,
  FAILED = 1,
  RECAPTCHA_FAILED = 2,
}

export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};
export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

const slice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: {
    clearTasks: (state, action) => {
      return {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(todoActions.setTodos, (state, action) => {
        action.payload.todos.forEach((tl) => {
          state[tl.id] = [];
        });
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state[action.payload.todoId] = action.payload.tasks;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.task.todoListId];
        tasks.unshift(action.payload.task);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex((task) => task.id === action.payload.taskId);
        if (index !== -1) {
          tasks[index] = { ...tasks[index], ...action.payload.domainModel };
        }
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todoId];
        const index = tasks.findIndex((task) => task.id === action.payload.taskId);
        if (index !== -1) {
          tasks.splice(index, 1);
        }
      })
      .addCase(todoThunks.addTodo.fulfilled, (state, action) => {
        state[action.payload.todo.id] = [];
      })
      .addCase(todoThunks.removeTodo.fulfilled, (state, action) => {
        delete state[action.payload.id];
      });
  },
  selectors: {
    selectTasks: (sliceState) => sliceState,
  },
});
//default thunk
export const getTasks = createAppAsyncThunk<{ tasks: TaskType[]; todoId: string }, string>(
  `${slice.name}/getTasks`,
  async (todoId: string, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      const res = await tasksAPI.getTasks(todoId);
      const tasks = res.data.items;
      dispatch(appActions.setAppStatus({ status: "successed" }));
      return { todoId, tasks };
    } catch (e) {
      handleServerNetworkError(e, dispatch);
      return rejectWithValue(null);
    }
  },
);

//thunk with using custom hook
export const addTask = createAppAsyncThunk<{ task: TaskType }, CreateTaskArgsType>(
  `${slice.name}/addTask`,
  async (args, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      const res = await tasksAPI.createTask(args);
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        const task = res.data.data.item;
        return { task };
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    });
  },
);

export const removeTask = createAppAsyncThunk<RemoveTaskArg, RemoveTaskArg>(
  `${slice.name}/removeTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      const res = await tasksAPI.deleteTask(arg.todoId, arg.taskId);
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        return arg;
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    });
  },
);

export const updateTask = createAppAsyncThunk<UpdateTasksArg, UpdateTasksArg>(
  `${slice.name}/updateTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      const state = getState();
      const task = state.tasks[arg.todolistId].find((t) => t.id === arg.taskId);
      if (!task) {
        console.warn("task not found in the state");
        return rejectWithValue(null);
      }
      const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...arg.domainModel,
      };

      const res = await tasksAPI.updateTask(arg.todolistId, arg.taskId, apiModel);
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(appActions.setAppStatus({ status: "successed" }));
        return arg;
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    });
  },
);
export const tasksSlice = slice.reducer;
export const tasksActions = slice.actions;
export const { selectTasks } = slice.selectors;
export const tasksThunks = { getTasks, addTask, updateTask, removeTask };
