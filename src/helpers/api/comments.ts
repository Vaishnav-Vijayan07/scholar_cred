import axios from "axios";
import { APICore } from "./apiCore";

const api = new APICore();

// account
function createComment(params: { student_id: number; comment: string }) {
  const baseUrl = "/comments";

  return api.create(`${baseUrl}`, params);
}

// account
function updateComment(
  id: number,
  params: {
    student_id: number;
    comment: string;
  }
) {
  const baseUrl = "/comments";
  return api.update(`${baseUrl}/${id}`, params);
}

function deleteComment(id: number) {
  const baseUrl = "/comments";
  return api.delete(`${baseUrl}/${id}`);
}

function getComments(student_id: number) {
  const baseUrl = "/comments";
  return api.get(`${baseUrl}/${student_id}`, {});
}

export { createComment, deleteComment, getComments, updateComment };
