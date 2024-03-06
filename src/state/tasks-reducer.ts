import { TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType } from "api/todolists-api";
import { Dispatch } from "redux";
import { AppRootStateType } from "./store";
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils";
import { appActions } from "app/app-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todoActions } from "state/todolists-reducer";
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
    removeTask: (state, action: PayloadAction<{ taskId: string; todoId: string }>) => {
      const tasks = state[action.payload.todoId];
      const index = tasks.findIndex((task) => task.id === action.payload.taskId);
      if (index !== -1) {
        tasks.splice(index, 1);
      }
    },
    addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
      const tasks = state[action.payload.task.todoListId];
      tasks.unshift(action.payload.task);
    },
    updateTask: (
      state,
      action: PayloadAction<{ taskId: string; model: UpdateDomainTaskModelType; todolistId: string }>,
    ) => {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex((task) => task.id === action.payload.taskId);
      if (index !== -1) {
        tasks[index] = { ...tasks[index], ...action.payload.model };
      }
    },
    setTask: (state, action: PayloadAction<{ todoId: string; tasks: TaskType[] }>) => {
      state[action.payload.todoId] = action.payload.tasks;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(todoActions.addTodolist, (state, action) => {
        state[action.payload.todo.id] = [];
      })
      .addCase(todoActions.removeTodolist, (state, action) => {
        delete state[action.payload.id];
      })
      .addCase(todoActions.setTodos, (state, action) => {
        action.payload.todos.forEach((tl) => {
          state[tl.id] = [];
        });
      });
  },
});

export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;

export const getTasksTC = (todoId: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }));
  todolistsAPI
    .getTasks(todoId)
    .then((res) => {
      const tasks = res.data.items;
      dispatch(tasksActions.setTask({ todoId, tasks }));
      dispatch(appActions.setAppStatus({ status: "successed" }));
    })
    .catch((e) => {
      handleServerNetworkError(e, dispatch);
    });
};

export const removeTaskTC = (todoId: string, taskId: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }));
  todolistsAPI
    .deleteTask(todoId, taskId)
    .then((res) => {
      dispatch(tasksActions.removeTask({ taskId, todoId }));
      dispatch(appActions.setAppStatus({ status: "successed" }));
    })
    .catch((e) => {
      handleServerNetworkError(e, dispatch);
    });
};

export const addTaskTC = (todoId: string, title: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }));
  todolistsAPI
    .createTask(todoId, title)
    .then((res) => {
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        const task = res.data.data.item;
        dispatch(tasksActions.addTask({ task }));
        dispatch(appActions.setAppStatus({ status: "successed" }));
      } else {
        handleServerAppError<{ item: TaskType }>(res.data, dispatch);
      }
    })
    .catch((e) => {
      handleServerNetworkError(e, dispatch);
    });
};

export const updateTaskTC =
  (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
  (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const state = getState();
    const task = state.tasks[todolistId].find((t) => t.id === taskId);
    if (!task) {
      console.warn("task not found in the state");
      return;
    }

    const apiModel: UpdateTaskModelType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      title: task.title,
      status: task.status,
      ...model,
    };

    dispatch(appActions.setAppStatus({ status: "loading" }));
    todolistsAPI
      .updateTask(todolistId, taskId, apiModel)
      .then((res) => {
        if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
          dispatch(tasksActions.updateTask({ taskId, model, todolistId }));
          dispatch(appActions.setAppStatus({ status: "successed" }));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((e) => {
        handleServerNetworkError(e, dispatch);
      });
  };
