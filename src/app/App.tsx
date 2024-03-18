import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";
import { Menu } from "@mui/icons-material";
import { useAppSelector } from "app/state/store";
import { RequestStatusType } from "./app-reducer";
import { ErrorSnackbar } from "common/components";
import { Login } from "features/auth/ui/Login/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { TodolistsList } from "features/TodolistsList/ui/TodolistsList";
import CircularProgress from "@mui/material/CircularProgress";
import { isInitializedSelector } from "app/app.selector";
import { isLoggedInSelector, statusSelector } from "features/auth/model/auth.selector";
import { authThunks } from "features/auth/model/authReducer";
import { useActions } from "app/hooks/useActions";
import { TaskType } from "features/TodolistsList/api/task/tasks-api.types";

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  const status = useAppSelector<RequestStatusType>(statusSelector);
  const isInitialized = useAppSelector(isInitializedSelector);
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const { me, logout } = useActions(authThunks);

  useEffect(() => {
    me();
  }, []);

  if (!isInitialized) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    );
  }

  const logoutHandler = () => {
    logout();
  };

  return (
    <div className="App">
      <ErrorSnackbar />
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          {isLoggedIn && (
            <Button color="inherit" onClick={logoutHandler}>
              logout
            </Button>
          )}
        </Toolbar>
        {status === "loading" && <LinearProgress color="secondary" />}
      </AppBar>
      <Container fixed>
        <Routes>
          <Route path={"/"} element={<TodolistsList />}></Route>
          <Route path={"/login"} element={<Login />}></Route>
          <Route path={"/404"} element={<h1>404 NOT FOUND</h1>}></Route>
          <Route path={"*"} element={<Navigate to={"/404"} />}></Route>
        </Routes>
      </Container>
    </div>
  );
}

export default App;
