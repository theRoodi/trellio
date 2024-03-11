import { todolistsAPI, TodolistType } from "features/TodolistsList/api/todolists-api";
import { Dispatch } from "redux";
import { appActions, RequestStatusType } from "app/app-reducer";
import { handleServerNetworkError } from "common/utils/handleServerNetworkError";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { tasksThunks } from "features/TodolistsList/Todolist/Task/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};

const slice = createSlice({
  name: "todolists",
  initialState: [] as TodolistDomainType[],
  reducers: {
    removeTodolist: (state, action: PayloadAction<{ id: string }>) => {
      // return state.filter((tl) => tl.id !== action.payload.todoId);
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) state.splice(index, 1);
    },
    addTodolist: (state, action: PayloadAction<{ todo: TodolistType }>) => {
      const newTodo: TodolistDomainType = {
        ...action.payload.todo,
        filter: "all",
        entityStatus: "idle",
      };
      state.unshift(newTodo);
    },
    changeTodolistTitle: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) {
        state[index].title = action.payload.title;
      }
    },
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
});
export const todoReducer = slice.reducer;
export const todoActions = slice.actions;

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
export const addTodoTC = (title: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }));
  todolistsAPI
    .createTodolist(title)
    .then((res) => {
      dispatch(todoActions.addTodolist({ todo: res.data.data.item }));
      dispatch(appActions.setAppStatus({ status: "successed" }));
    })
    .catch((e) => {
      handleServerNetworkError(e, dispatch);
    });
};

export const removeTodoTC = (id: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }));
  dispatch(todoActions.setEntityStatus({ id, entity: "loading" }));
  todolistsAPI
    .deleteTodolist(id)
    .then((res) => {
      dispatch(todoActions.removeTodolist({ id }));
      dispatch(appActions.setAppStatus({ status: "successed" }));
      dispatch(todoActions.setEntityStatus({ id, entity: "successed" }));
    })
    .catch((e) => {
      handleServerNetworkError(e, dispatch);
      dispatch(todoActions.setEntityStatus({ id, entity: "idle" }));
    });
};

export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }));
  todolistsAPI
    .updateTodolist(id, title)
    .then((res) => {
      dispatch(todoActions.changeTodolistTitle({ id, title }));
      dispatch(appActions.setAppStatus({ status: "successed" }));
    })
    .catch((e) => {
      handleServerNetworkError(e, dispatch);
    });
};
