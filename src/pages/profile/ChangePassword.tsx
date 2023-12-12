import { Button } from "react-bootstrap";
import { FormInput, VerticalForm } from "../../components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

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

const ChangePassword = ({ projectDetails }: AboutProps) => {
  const { t } = useTranslation();

  const schemaResolver = yupResolver(
    yup.object().shape({
      old_password: yup.string().required(t("Please enter Old Password")),
      new_password: yup
        .string()
        .required(t("Please enter New Password"))
        .min(8, t("Password must be at least 8 characters long"))
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).*$/,
          t("Password must include at least one uppercase letter, one lowercase letter, one number, and one special character")
        ),
      reenter_new_password: yup
        .string()
        .required(t("Please re-enter New Password"))
        .oneOf([yup.ref("new_password"), null], t("Passwords must match")),
    })
  );

  const onSubmit = () => {};
  return (
    <>
      <VerticalForm onSubmit={onSubmit} resolver={schemaResolver}>
        <FormInput label={t("Old Password")} type="password" name="old_password" placeholder={t("Enter your Old Password")} containerClass={"mb-3"} />
        <FormInput label={t("New Password")} type="password" name="new_password" placeholder={t("Enter your New Password")} containerClass={"mb-3"} />
        <FormInput label={t("Re-enter New Password")} type="password" name="reenter_new_password" placeholder={t("Re-enter your New Password")} containerClass={"mb-3"} />

        <div className="mb-0 text-center d-grid">
          <Button variant="primary" type="submit" disabled={false}>
            {t("Reset Password")}
          </Button>
        </div>
      </VerticalForm>
    </>
  );
};

export default ChangePassword;
