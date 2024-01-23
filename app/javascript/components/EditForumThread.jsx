import React, { useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { UserContext } from "./App";

const EditForumThread = () => {
  const params = useParams();

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Question");
  const [body, setBody] = useState("");
  const { user, setUser } = useContext(UserContext);
  const [forumThread, setForumThread] = useState([]);

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
  //   const url = `/api/v1/forum_thread/show/${params.id}`;
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

  //       // console.log("running", deleted);
  //     })
  //     .catch(/*() => navigate("/")*/);
  // }

  const onSubmit = (event) => {
    event.preventDefault();
    const url = `/api/v1/forum_thread/update/${params.id}`;
    console.log(title, category, body, "creating");
    if (body.length == 0) return;
    console.log(stripHtmlEntities(body), "stripHtmlEntities(body)");
  
    const forumThreadContent = {
      title,
      category,
      body: stripHtmlEntities(body),
      // user_id: user.id,
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "PUT",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(forumThreadContent),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then()
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">Edit Post</h1>
          <form onSubmit={onSubmit}>
          <div className="form-group">
              <label htmlFor="title">Recipe name</label>
              <input
                type="text"
                name="name"
                id="title"
                className="form-control"
                required
                onChange={(event) => onChange(event, setTitle)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">
                category name
                <select
                  type="text"
                  name="name"
                  id="category"
                  className="form-control"
                  required
                  onChange={(event) => onChange(event, setCategory)}
                  defaultValue="Question"
                >
                  <option value="Question">Question</option>
                  <option value="Discussion">Discussion</option>
                  <option value="Off-Advice">Off-Advice</option>
                  <option value="Other">Other</option>
                </select>
              </label>
            </div>

            <label htmlFor="body">Preparation Instructions</label>
            <textarea
              className="form-control"
              id="body"
              name="body"
              rows="5"
              required
              onChange={(event) => onChange(event, setBody)}
            />
            <button type="submit" className="btn custom-button mt-3">
              Create Recipe
            </button>
            <Link to="/forumThreads" className="btn btn-link mt-3">
              Back to recipes
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditForumThread;
