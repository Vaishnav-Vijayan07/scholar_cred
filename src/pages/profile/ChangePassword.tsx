import { Alert, Button, Form } from "react-bootstrap";
import { FormInput, VerticalForm } from "../../components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../redux/actions";
import { RootState } from "../../redux/store";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

interface FormDataType {
  new_password: string;
  old_password: string;
  reenter_new_password: string;
}

const initialState = {
  new_password: "",
  old_password: "",
  reenter_new_password: "",
};
const initialValidationState = {
  new_password: "",
  old_password: "",
  reenter_new_password: "",
};

const ChangePassword = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user, isPasswordChange, error, loading } = useSelector((state: RootState) => ({
    user: state.Auth.user,
    loading: state.Auth.loading,
    isPasswordChange: state.Auth.isPasswordChange,
    error: state.Auth.error,
  }));

  const [formData, setFormData] = useState<FormDataType>(initialState);
  const [validationErrors, setValidationErrors] = useState(initialValidationState);

  const validationSchema = yup.object().shape({
    old_password: yup.string().required(t("Please enter Old Password")),
    new_password: yup.string().required(t("Please enter New Password")).min(6, t("Password must be at least 6 characters long")),
    reenter_new_password: yup
      .string()
      .required(t("Please re-enter New Password"))
      .oneOf([yup.ref("new_password"), null], t("Passwords do not match")),
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;


    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form using yup
    try {
      await validationSchema.validate(formData, { abortEarly: false });

      dispatch(changePassword(formData.old_password, formData.new_password, user?.user_id));

      // Clear validation errors
      setValidationErrors(initialValidationState);

      //clear form data
      setFormData(initialState);

      // ... Rest of the form submission logic ...
    } catch (validationError) {
      // Handle validation errors
      if (validationError instanceof yup.ValidationError) {
        const errors: any = {};
        validationError.inner.forEach((error) => {
          if (error.path) {
            errors[error.path] = error.message;
          }
        });
        setValidationErrors(errors);
      }
    }
  };

  useEffect(() => {
    // Check for errors and clear the form
    if (!loading && !error) {
      setFormData(initialState);
    }
  }, [loading, error]);

  return (
    <>
      {error && (
        <Alert variant="danger" className="my-2">
          {error}
        </Alert>
      )}
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="old_password">
          <Form.Label>{t("Old Password")}</Form.Label>
          <Form.Control type="password" placeholder="Enter Your Old Password" name="old_password" value={formData.old_password} onChange={handleInputChange} />
          {validationErrors.old_password && <Form.Text className="text-danger">{validationErrors.old_password}</Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="new_password">
          <Form.Label>{t("New Password")}</Form.Label>
          <Form.Control type="password" placeholder="Enter New Password" name="new_password" value={formData.new_password} onChange={handleInputChange} />
          {validationErrors.new_password && <Form.Text className="text-danger">{validationErrors.new_password}</Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="reenter_new_password">
          <Form.Label>{t("Re-enter New Password")}</Form.Label>
          <Form.Control type="password" placeholder="Re-enter New Password" name="reenter_new_password" value={formData.reenter_new_password} onChange={handleInputChange} />
          {validationErrors.reenter_new_password && <Form.Text className="text-danger">{validationErrors.reenter_new_password}</Form.Text>}
        </Form.Group>

        <div className="mb-0 text-center d-grid">
          <Button variant="primary" type="submit" disabled={loading}>
            {t("Reset Password")}
          </Button>
        </div>
      </Form>
    </>
  );
};

export default ChangePassword;
