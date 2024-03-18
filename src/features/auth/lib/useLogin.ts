import { useFormik } from "formik";
import { authThunks } from "features/auth/model/authReducer";
import { BaseResponseType } from "types/responce.types";
import { useAppDispatch, useAppSelector } from "app/state/store";
import { isLoggedInSelector } from "features/auth/model/auth.selector";

export type LoginDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};

export type FormikErrorType = Partial<Omit<LoginDataType, "captcha">>;
export const useLogin = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: (values) => {
      const errors: FormikErrorType = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address";
      }

      if (!values.password) {
        errors.password = "Required!";
      } else if (values.password.length < 5) {
        errors.password = "Must be more than 5 symbols";
      }

      return errors;
    },
    onSubmit: (values, formikHelpers) => {
      dispatch(authThunks.login(values))
        .unwrap()
        .then(() => {})
        .catch((e: BaseResponseType) => {
          e.fieldsErrors?.forEach((f) => {
            return formikHelpers.setFieldError(f.field, f.error);
          });
        });
    },
  });
  return { formik, isLoggedIn };
};
