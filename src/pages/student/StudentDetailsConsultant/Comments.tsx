import React, { useState } from "react";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { Card, Form } from "react-bootstrap";

import avatar3 from "../../../assets/images/users/user-3.jpg";
import { useDispatch } from "react-redux";
import { createComment } from "../../../redux/actions";
import { calculateTimeAgo } from "../../../constants/functons";

const commentValidationState = {
  student_id: "",
  commentText: "",
};

const Comments = ({ CommentsData, studentId }: any) => {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState<string>("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await validationSchema.validate({ commentText }, { abortEarly: false });
      dispatch(createComment(studentId, commentText));
      setCommentText("");
      setValidationErrors(commentValidationState);
    } catch (validationError) {
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

  const [validationErrors, setValidationErrors] = useState(commentValidationState);

  const validationSchema = yup.object().shape({
    commentText: yup.string().required("Comment name is required").min(4, "Comment must be at least 4 characters"),
  });
  return (
    <div className="p-3">
      <h4 className="mb-4 mt-0 font-16">Comments ({CommentsData?.length})</h4>

      <div className="clerfix"></div>

      {CommentsData?.map((item: any) => (
        <div className="d-flex align-items-start mb-3">
          {/* {item?.author_avatar ? (
              <img className="me-2 rounded-circle" src={`${process.env.REACT_APP_BACKEND_URL}${item?.author_avatar}`} alt="" height="32" />
            ) : (
              <img className="me-2 rounded-circle" src={avatar3} alt="" height="32" />
            )} */}
          {/* <img className="me-2 rounded-circle" src={avatar3} alt="" height="32" /> */}
          <div className="circle">
            <p className="circle-inner onject-fit-contain">{item?.author[0]}</p>
          </div>

          <div className="w-100">
            <h5 className="mt-0">
              {item?.author} <small className="text-muted float-end">{calculateTimeAgo(item?.created_at)}</small>
            </h5>
            {/* <i className="mdi mdi-at"></i> */}
            {item?.comment}
            <br />
          </div>
        </div>
      ))}

      <div className="border rounded mt-4">
        <form className="comment-area-box" onSubmit={handleSubmit}>
          <textarea rows={3} className="form-control border-0 resize-none" value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Your comment..." />
          <div className="p-2 bg-light d-flex justify-content-between align-items-center">
            <div>
              {/* <Link to="#" className="btn btn-sm px-1 btn-light">
                  <i className="mdi mdi-upload"></i>
                </Link>
                <Link to="#" className="btn btn-sm px-1 btn-light">
                  <i className="mdi mdi-at"></i>
                </Link> */}
            </div>
            <button type="submit" className="btn  btn-sm btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
      {validationErrors.commentText && <Form.Text className="text-danger">{validationErrors.commentText}</Form.Text>}
    </div>
  );
};

export default Comments;
