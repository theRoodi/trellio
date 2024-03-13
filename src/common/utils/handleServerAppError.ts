import { Dispatch } from "redux";
import { appActions } from "app/app-reducer";
import { BaseResponseType } from "types/responce.types";

type ErrorUtilsDispatchType = Dispatch;

export const handleServerAppError = <T>(
  data: BaseResponseType<T>,
  dispatch: ErrorUtilsDispatchType,
  isShowGlobalError: boolean = true,
) => {
  if (isShowGlobalError) {
    if (data.messages.length) {
      dispatch(appActions.setAppError({ error: data.messages[0] }));
    } else {
      dispatch(appActions.setAppError({ error: "Some error occurred" }));
    }
  }
  dispatch(appActions.setAppStatus({ status: "failed" }));
};
