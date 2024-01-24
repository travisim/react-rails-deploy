import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./App";

const NewForumThread = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Question");
  const [body, setBody] = useState("");
  const { user, setUser } = useContext(UserContext);

  const stripHtmlEntities = (str) => {
    return String(str)
      .replace(/\n/g, "<br> <br>")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const url = "/api/v1/forum_thread/create";
    if ((title.length == 0 || body.length == 0, category.length == 0)) return;
    const forumThreadContent = {
      title,
      category,
      body: stripHtmlEntities(body),
      author: user.username,
      user_id: user.id,
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
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
      .then((response) => navigate(`/forumThread/${response.id}`))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            Add a new Thread
          </h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="title">Thread Title</label>
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
              Create Thread
            </button>

            <Link to="/forumThreads" className="btn custom-button mt-3 ">
              Back to threads
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewForumThread;
