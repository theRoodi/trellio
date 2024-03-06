import React from "react";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { RequestStatusType } from "../../app/app-reducer";
import { useFormik } from "formik";
import { loginTC } from "./authReducer";
import { Navigate } from "react-router-dom";

type FormikErrorType = {
  email?: string;
  password?: string;
};

export type LoginDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const Login = () => {
  const status = useAppSelector<RequestStatusType>((state) => state.app.status);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const dispatch = useAppDispatch();

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
    onSubmit: (values) => {
      // alert(JSON.stringify(values))
      dispatch(loginTC(values));
      formik.resetForm();
    },
  });

  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  }
  return (
    <Grid container justifyContent={"center"}>
      <Grid item justifyContent={"center"}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>You can use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                error={!!(formik.touched.email && formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                {...formik.getFieldProps("email")}
              />
              {/*{formik.touched.email && formik.errors.email &&*/}
              {/*    <div style={{color: 'red'}}>{formik.errors.email}</div>}*/}
              <TextField
                type="password"
                label="Password"
                margin="normal"
                error={!!(formik.touched.password && formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                {...formik.getFieldProps("password")}
              />
              <FormControlLabel
                label={"Remember me"}
                control={<Checkbox />}
                onChange={formik.handleChange}
                name="rememberMe"
                checked={formik.values.rememberMe}
              />
              <Button type={"submit"} variant={"contained"} color={"primary"}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};
