import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { UserContext } from "./App";

const EditForumThreadComment = () => {
  const params = useParams();

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Question");
  const [body, setBody] = useState("");
  const { user, setUser } = useContext(UserContext);
  const [forumThreadComment, setForumThreadComment] = useState([]);

  const stripHtmlEntities = (str) => {
    return String(str)
      .replace(/\n/g, "<br> <br>")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  // function fetchComment() {
  //   const url = `/api/v1/forum_thread_comments/show/${params.id}`;
  //   fetch(url)
  //     .then((res) => {
  //       if (res.ok) {
  //         console.log(res, "res");
  //         return res.json();
  //       }
  //       throw new Error("Network response was not ok.");
  //     })
  //     .then((res) => {
  //       setForumThreadComment(res);
  //       console.log(res, "res");

  //       // console.log("running", deleted);
  //     })
  //     .catch(/*() => navigate("/")*/);
  // }

  useEffect(() => {
    const url = `/api/v1/forum_thread_comments/show/${params.id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setForumThreadComment(response))
      .catch();
  }, []);

  const handleChange = (e) => {
    setForumThreadComment({
      ...forumThreadComment,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const url = `/api/v1/forum_thread_comments/update/${params.id}`;
    if (forumThreadComment.body.length == 0) return;
    const forumThreadCommentContent = {
      body: stripHtmlEntities(forumThreadComment.body),
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "PUT",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(forumThreadCommentContent),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(()=>navigate(`/forumThread/${forumThreadComment.forum_thread_id}` ))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">Edit comments</h1>
          <form onSubmit={onSubmit}>
            <label htmlFor="body">Preparation Instructions</label>
            <textarea
              value={forumThreadComment.body}
              className="form-control"
              id="body"
              name="body"
              rows="5"
              required
              onChange={handleChange}
            />
            <button type="submit" className="btn custom-button mt-3">
              Save Edit
            </button>
            <Link to={`/forumThread/${forumThreadComment.forum_thread_id}`} className="btn btn-link mt-3">
              Back to Thread
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditForumThreadComment;
