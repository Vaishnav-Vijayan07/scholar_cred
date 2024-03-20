import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Row, Col, InputGroup, Form } from "react-bootstrap";

// components
import { FormInput } from "../../components/";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { editProfile, getLatestData } from "../../redux/actions";
import axios from "axios";
import { getUserFromCookie } from "../../helpers/api/apiCore";

const PersonalInfo = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<any>([]);
  const [isImage, setIsImage] = useState(false);
  const [imageError, setImageError] = useState("");
  const [errors, setErrors] = useState({ firstname: "", lastname: "" });
  const [state, setState] = useState<any>({
    id: "",
    firstname: "",
    lastname: "",
    file: "",
  });
  const refreshing = useSelector(
    (state: any) => state.refreshReducer.refreshing
  );

  useEffect(() => {
    const { user_id } = getUserFromCookie();
    (async () => {
      try {
        const response = await axios.get(`admin_users_by_userid?id=${user_id}`);
        const result = response.data.data;
        setUser(result);
        setState({
          id: result?.id,
          firstname: result?.username?.split(" ")[0],
          lastname: result?.username?.split(" ")[1],
        });
      } catch (error) {
        console.error("Error fetching personal info:", error);
      }
    })();
  }, [refreshing]);

  const handleInputChange = (event: any) => {
    const { name, value, files } = event.target;

    if (files) {
      setIsImage(false);
      const file = files[0];
      if (!file.type.startsWith("image/")) {
        setImageError("Please choose a proper image file");
        return;
      }
      setState((prevState: any) => ({
        ...prevState,
        [name]: file,
      }));
      setImageError("");
      setIsImage(true);
    } else {
      setState((prevProps: any) => ({
        ...prevProps,
        [name]: value,
      }));
    }
  };

  const schema = yup.object().shape({
    firstname: yup
      .string()
      .trim()
      .required("First name is required")
      .min(3, "First name must be at least 3 characters"),
    lastname: yup
      .string()
      .trim()
      .required("Last name is required")
      .min(3, "Last name must be at least 3 characters"),
  });

  const handle = async () => {
    try {
      await schema.validate(state, { abortEarly: false });
      console.log(state);
      dispatch(editProfile(state));
      setIsImage(false);
    } catch (validationError) {
      if (validationError instanceof yup.ValidationError) {
        const errors: any = {};
        validationError.inner.forEach((error) => {
          if (error.path) {
            errors[error.path] = error.message;
          }
        });
        setErrors(errors);
      }
    }
  };
  return (
    <>
      <h5 className="mb-4 text-uppercase">
        <i className="mdi mdi-account-circle me-1"></i> Personal Info
      </h5>
      <Form>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="old_password">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                name="firstname"
                value={state?.firstname}
                onChange={handleInputChange}
              />
              {errors.firstname && (
                <Form.Text className="text-danger">
                  {errors.firstname}
                </Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="old_password">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter second name"
                name="lastname"
                value={state?.lastname}
                onChange={handleInputChange}
              />
              {errors.lastname && (
                <Form.Text className="text-danger">{errors.lastname}</Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>
        {user.user_type_id === 2 && (
          <Row>
            <Col md={6}>
              <FormInput
                label="Profile Picture"
                type="file"
                name="file"
                onChange={handleInputChange}
                containerClass={"mb-1"}
              />
              {imageError && (
                <Form.Text className="text-danger">{imageError}</Form.Text>
              )}
            </Col>
            {isImage && (
              <Col md={6}>
                <img
                  src={URL.createObjectURL(state.file)}
                  alt="selected file"
                  width={100}
                  className="mt-2"
                />
              </Col>
            )}
          </Row>
        )}
        <div className="text-end">
          <button
            type="button"
            onClick={handle}
            className="btn btn-success mt-2"
          >
            <i className="mdi mdi-content-save"></i> Save
          </button>
        </div>
      </Form>
    </>
  );
};

// const CompanyInfo = ({ register, errors, control }: FormInputProps) => {
//   return (
//     <>
//       <h5 className="mb-3 text-uppercase bg-light p-2">
//         <i className="mdi mdi-office-building me-1"></i> Company Info
//       </h5>
//       <Row>
//         <Col md={6}>
//           <FormInput
//             label="Company Name"
//             type="text"
//             name="companyname"
//             placeholder="Enter company name"
//             containerClass={"mb-3"}
//             register={register}
//             key="companyname"
//             errors={errors}
//             control={control}
//           />
//         </Col>
//         <Col md={6}>
//           <FormInput
//             label="Website"
//             type="text"
//             name="cwebsite"
//             placeholder="Enter website url"
//             containerClass={"mb-3"}
//             register={register}
//             key="cwebsite"
//             errors={errors}
//             control={control}
//           />
//         </Col>
//       </Row>
//     </>
//   );
// };

// const Social = ({ socialinfo }: { socialinfo: SocialInfo[] }) => {
//   return (
//     <>
//       <h5 className="mb-3 text-uppercase bg-light p-2">
//         <i className="mdi mdi-earth me-1"></i> Social
//       </h5>

//       <Row>
//         {(socialinfo || []).map((item, index) => {
//           return (
//             <Col key={index} md={6} className="mb-3">
//               <Form.Label> {item.label} </Form.Label>
//               <InputGroup className="mb-0">
//                 <span className="input-group-text">
//                   <i className={item.icon}></i>
//                 </span>
//                 <Form.Control placeholder={item.placeholder} />
//               </InputGroup>
//             </Col>
//           );
//         })}
//       </Row>
//     </>
//   );
// };

const Settings = () => {
  // const socialInfo: SocialInfo[] = [
  //   {
  //     label: "Facebook",
  //     icon: "fab fa-facebook-square",
  //     placeholder: "Url",
  //   },
  //   {
  //     label: "Twitter",
  //     icon: "fab fa-twitter",
  //     placeholder: "Username",
  //   },
  //   {
  //     label: "Instagram",
  //     icon: "fab fa-instagram",
  //     placeholder: "Url",
  //   },
  //   {
  //     label: "Linkedin",
  //     icon: "fab fa-linkedin",
  //     placeholder: "Url",
  //   },
  //   {
  //     label: "Skype",
  //     icon: "fab fa-skype",
  //     placeholder: "@username",
  //   },
  //   {
  //     label: "Github",
  //     icon: "fab fa-github",
  //     placeholder: "Username",
  //   },
  // ];

  return (
    <>
      <form>
        <PersonalInfo />
        {/* <CompanyInfo register={register} errors={errors} control={control} />
        <Social socialinfo={socialInfo} /> */}
      </form>
    </>
  );
};

export default Settings;
