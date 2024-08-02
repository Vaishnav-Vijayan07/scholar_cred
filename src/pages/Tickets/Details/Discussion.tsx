import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { calculateTimeAgo } from "../../../constants/functons";
import { useDispatch } from "react-redux";
import { updateTicketComments } from "../../../redux/tickets/actions";
import avatar3 from "../../../assets/images/logo-sm.png";
import Avatar from "./Avatar";
import { showWarningAlert } from "../../../constants/alerts";

type Comment = {
  id: number;
  comment: string;
  tickets_id: number;
  created_at: string;
  updated_at: string;
  user_id: number;
  author: string;
  author_avatar: string | null;
};

type User = {
  user_id: number;
  username: string;
  password: string;
  email: string;
  full_name: string;
  role: string;
  role_name: string;
  consultant_id: string | null;
  image_url: string | null;
  Avatar: string;
  token: string;
};

type Props = {
  comments: Comment[];
  ticket_id: string;
  user: User;
  student_status: string;
};

const Discussion = ({ comments, ticket_id, user, student_status }: Props) => {
  const roles = ["CRED_ADMIN", "CRED_STAFF"];
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchParam = search?.split("?")[1];

  const dispatch = useDispatch();

  const handleCommentSubmit = () => {
    if (!student_status) {
      showWarningAlert("Please initiate the student to post comments");
      return;
    }

    dispatch(updateTicketComments(ticket_id, comment));
    setComment("");
  };

  useEffect(() => {
    if (searchParam) {
      const elem: any = document.getElementById(searchParam);
      elem.scrollIntoView({ behavior: "smooth" });
      navigate(`/apps/Tickets-details/${ticket_id}`, { replace: true });
    }
  }, [ticket_id, searchParam]);

  return (
    <>
      <Card>
        <Card.Body>
          <h4 className="mb-4 mt-0 font-16">Discussion ({comments?.length})</h4>
          <div className="clerfix"></div>

          {comments.map((item: any) => (
            <div className="d-flex gap-3" key={item.id}>
              <div>
                {roles.includes(item?.role) && (
                  <img
                    className="me-2 rounded-circle"
                    src={avatar3}
                    alt=""
                    height="32"
                  />
                )}
              </div>
              <div className="w-100">
                <h5 className="mt-0 mb-1">
                  {item.user_id === user.user_id ? "You" : item.author}{" "}
                  <small className="text-muted float-end">
                    {calculateTimeAgo(item.created_at)}
                  </small>
                </h5>
                {item.comment}
                <br />
                <Link
                  to="#"
                  className="text-muted font-13 d-inline-block mt-2"
                ></Link>
              </div>
            </div>
          ))}

          {roles.includes(user.role_name) && (
            <div className="border rounded mt-4">
              <form className="comment-area-box">
                <textarea
                  rows={3}
                  className="form-control border-0 resize-none"
                  placeholder="Your comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <div
                  className="p-2 bg-light d-flex justify-content-between align-items-center"
                  id={searchParam}
                >
                  <button
                    onClick={handleCommentSubmit}
                    disabled={comment === ""}
                    type="button"
                    className="btn btn-sm btn-success"
                  >
                    <i className="mdi mdi-send me-1"></i>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default Discussion;
