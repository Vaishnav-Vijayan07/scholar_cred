import { Alert, Button } from "react-bootstrap";
import { FormInput, VerticalForm } from "../../components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../redux/actions";
import { RootState } from "../../redux/store";

interface AboutProps {
  projectDetails: {
    id: number;
    client: string;
    name: string;
    startDate: string;
    dueDate: string;
    status: string;
  }[];
}

const ChangePassword = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user, isPasswordChange, error, loading } = useSelector((state: RootState) => ({
    user: state.Auth.user,
    loading: state.Auth.loading,
    isPasswordChange: state.Auth.isPasswordChange,
    error: state.Auth.error,
  }));

  console.log("message-->", isPasswordChange);
  console.log("error-->", error);

  const schemaResolver = yupResolver(
    yup.object().shape({
      old_password: yup.string().required(t("Please enter Old Password")),
      // new_password: yup
      //   .string()
      //   .required(t("Please enter New Password"))
      //   .min(8, t("Password must be at least 8 characters long"))
      //   .matches(
      //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).*$/,
      //     t("Password must include at least one uppercase letter, one lowercase letter, one number, and one special character")
      //   ),
      new_password: yup.string().required(t("Please enter New Password")).min(6, t("Password must be at least 6 characters long")),
      reenter_new_password: yup
        .string()
        .required(t("Please re-enter New Password"))
        .oneOf([yup.ref("new_password"), null], t("Passwords must match")),
    })
  );

  const onSubmit = (formData: any) => {
    dispatch(changePassword(formData["old_password"], formData["new_password"], user?.user_id));
  };

  return (
    <>
      {error && (
        <Alert variant="danger" className="my-2">
          {error}
        </Alert>
      )}
      <VerticalForm onSubmit={onSubmit} resolver={schemaResolver}>
        <FormInput label={t("Old Password")} type="password" name="old_password" placeholder={t("Enter Your Old Password")} containerClass={"mb-3"} />
        <FormInput label={t("New Password")} type="password" name="new_password" placeholder={t("Enter Your New Password")} containerClass={"mb-3"} />
        <FormInput label={t("Re-enter New Password")} type="password" name="reenter_new_password" placeholder={t("Re-enter Your New Password")} containerClass={"mb-3"} />

        <div className="mb-0 text-center d-grid">
          <Button variant="primary" type="submit" disabled={loading}>
            {t("Reset Password")}
          </Button>
        </div>
      </VerticalForm>
    </>
  );
};

export default ChangePassword;
