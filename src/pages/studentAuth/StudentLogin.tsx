import React, { useEffect } from "react";
import { Button, Alert, Row, Col, Form } from "react-bootstrap";
import { Navigate, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

// actions
import { resetAuth, loginUser } from "../../redux/actions";

// store
import { RootState, AppDispatch } from "../../redux/store";

// components
import { VerticalForm, FormInput } from "../../components/";

import AuthLayout from "./StudentAuthLayout";

interface UserData {
  username: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const { user, userLoggedIn, loading, error } = useSelector((state: RootState) => ({
    user: state.Auth.user,
    loading: state.Auth.loading,
    error: state.Auth.error,
    userLoggedIn: state.Auth.userLoggedIn,
  }));

  useEffect(() => {
    dispatch(resetAuth());
  }, [dispatch]);

  /*
  form validation schema
  */
  const schemaResolver = yupResolver(
    yup.object().shape({
      username: yup.string().required(t("Please enter Username")),
      password: yup.string().required(t("Please enter Password")),
      confirmPassword: yup.string().oneOf([yup.ref("password"), null], t("Passwords must match")),
      agreeTerms: yup.boolean().oneOf([true], t("Please agree to the terms")),
    })
  );

  /*
  handle form submission
  */
  const onSubmit = (formData: UserData) => {
    console.log("formData---->", formData);

    if (formData.agreeTerms) {
      //   dispatch(loginUser(formData["username"], formData["password"]));
    }
  };

  const location = useLocation();

  return (
    <>
      {/* {(userLoggedIn || user) && <Navigate to={redirectUrl}></Navigate>} */}

      <AuthLayout
        helpText={t(
          "Kindly provide your email address and password to initiate the deletion of all your data; please note that it may take up to 24 hours for the changes to reflect."
        )}
      >
        {error && (
          <Alert variant="danger" className="my-2">
            {error}
          </Alert>
        )}

        <VerticalForm<UserData> onSubmit={onSubmit} resolver={schemaResolver} defaultValues={{ username: "", password: "" }}>
          <FormInput label={t("Username")} type="text" name="username" placeholder="Enter your Username" containerClass={"mb-3"} />
          <FormInput label={t("Password")} type="password" name="password" placeholder="Enter your password" containerClass={"mb-3"}></FormInput>
          <FormInput label={t("Re-enter Password")} type="password" name="confirmPassword" placeholder="Re-enter your password" containerClass={"mb-3"} />
          <FormInput type="checkbox" label={t("I hereby agree to delete all the data")} name="agreeTerms" className="mb-3" />

          <div className="text-center d-grid">
            <Button variant="primary" type="submit" disabled={loading}>
              {t("Delete Student Data")}
            </Button>
          </div>
        </VerticalForm>
      </AuthLayout>
    </>
  );
};

export default Login;
