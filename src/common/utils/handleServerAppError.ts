import { Dispatch } from "redux";
import { appActions } from "app/app-reducer";
import { ResponseType } from "types/responce.types";

type ErrorUtilsDispatchType = Dispatch;

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
  if (data.messages.length) {
    dispatch(appActions.setAppError({ error: data.messages[0] }));
  } else {
    dispatch(appActions.setAppError({ error: "Some error occurred" }));
  }
  dispatch(appActions.setAppStatus({ status: "failed" }));
};
