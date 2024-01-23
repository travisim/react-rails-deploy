import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { UserContext } from "./App";

const EditForumThread = () => {
  const params = useParams();

  const navigate = useNavigate();
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

  useEffect(() => {
    const url = `/api/v1/forum_thread/show/${params.id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setForumThread(response))
      .catch();
  }, []);
  console.log(forumThread, "forumThread2");

  const handleChange = (e) => {
    setForumThread({
      ...forumThread,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const url = `/api/v1/forum_thread/update/${params.id}`;
    if (
      forumThread.title.length == 0 ||
      forumThread.category.length == 0 ||
      forumThread.body.length == 0
    )
      return;

    const forumThreadContent = {
      title: forumThread.title,
      category: forumThread.category,
      body: stripHtmlEntities(forumThread.body),
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
      .then(() => navigate(`/forumThreads`))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">Edit Post</h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="title">Thread Name</label>
              <input
                type="text"
                name="title"
                id="title"
                className="form-control"
                required
                defaultValue={forumThread.title}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">
                category name
                <select
                  type="text"
                  name="category"
                  id="category"
                  className="form-control"
                  required
                  value={forumThread.category}
                  onChange={handleChange}
                  // defaultValue="Question"
                >
                  <option value="Question">Question</option>
                  <option value="Discussion">Discussion</option>
                  <option value="Off-Advice">Off-Advice</option>
                  <option value="Other">Other</option>
                </select>
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="body">Preparation Instructions</label>
              <textarea
                className="form-control"
                id="body"
                name="body"
                rows="5"
                required
                value={forumThread.body}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn custom-button mt-3">
              Create Recipe
            </button>
            
        <Link to="/forumThreads" className="btn custom-button ">
          Back to threads
        </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditForumThread;
