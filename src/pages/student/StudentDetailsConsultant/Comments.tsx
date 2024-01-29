import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

import avatar3 from "../../../assets/images/users/user-3.jpg";
import { useDispatch } from "react-redux";
import { createComment } from "../../../redux/actions";

const Comments = ({ CommentsData, studentId }: any) => {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState<string>("");
  console.log("commentText", commentText);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    try {
      dispatch(createComment(studentId, commentText));
      setCommentText("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Card>
      <Card.Body>
        {/* <div className="float-end">
          <select className="form-select form-select-sm">
            <option defaultValue="0">Recent</option>
            <option value="1">Most Helpful</option>
            <option value="2">High to Low</option>
            <option value="3">Low to High</option>
          </select>
        </div> */}

        <h4 className="mb-4 mt-0 font-16">Comments ({CommentsData?.length})</h4>

        <div className="clerfix"></div>

        {CommentsData?.map((item: any) => (
          <div className="d-flex align-items-start mb-3">
            {item?.image_url ? (
              <img className="me-2 rounded-circle" src={`${process.env.REACT_APP_BACKEND_URL}${item?.image_url}`} alt="" height="32" />
            ) : (
              <img className="me-2 rounded-circle" src={avatar3} alt="" height="32" />
            )}
            <div className="w-100">
              <h5 className="mt-0">
                {item?.author} <small className="text-muted float-end">5 hours ago</small>
              </h5>
              <i className="mdi mdi-at"></i>
              {item?.comment}
              <br />
            </div>
          </div>
        ))}

        <div className="border rounded mt-4">
          <form className="comment-area-box" onSubmit={handleSubmit}>
            <textarea
              rows={3}
              className="form-control border-0 resize-none"
              required
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Your comment..."
            />
            <div className="p-2 bg-light d-flex justify-content-between align-items-center">
              <div>
                {/* <Link to="#" className="btn btn-sm px-1 btn-light">
                  <i className="mdi mdi-upload"></i>
                </Link>
                <Link to="#" className="btn btn-sm px-1 btn-light">
                  <i className="mdi mdi-at"></i>
                </Link> */}
              </div>
              <button type="submit" className="btn btn-sm btn-success">
                <i className="uil uil-message me-1"></i>Submit
              </button>
            </div>
          </form>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Comments;
