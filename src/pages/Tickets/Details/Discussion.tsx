import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { calculateTimeAgo } from "../../../constants/functons";
import { useDispatch } from "react-redux";
import { updateTicketComments } from "../../../redux/tickets/actions";
import Avatar from "./Avatar";

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
};

const Discussion = ({ comments, ticket_id, user }: Props) => {
  console.log(user);

  const roles = ["CRED_ADMIN", "CRED_STAFF"];

  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const handleCommentSubmit = () => {
    dispatch(updateTicketComments(ticket_id, comment));
    setComment("");
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h4 className="mb-4 mt-0 font-16">Discussion ({comments?.length})</h4>
          <div className="clerfix"></div>

          {comments.map((item: any) => (
            <div className="d-flex gap-3" key={item.id}>
              <div>
                {item.author_avatar ? (
                  <Avatar name={item.author} image={item.author_avatar} />
                ) : (
                  <Avatar name={item.author} image={null} />
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
                <div className="p-2 bg-light d-flex justify-content-between align-items-center">
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
