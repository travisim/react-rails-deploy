import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { UserContext } from "./App";
import LongMenu from "./MaxHeightMenu";





const ForumThread = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [forumThread, setForumThread] = useState({ title: "" });
  const [allUsers, setAllUsers] = useState([]);
  const [body, setBody] = useState("");
  const { user, setUser } = useContext(UserContext);
  const [textFieldValue, setTextFieldValue] = useState("");

  const [forumThreadComments, setForumThreadComments] = useState([]);

  

  const token = document.querySelector('meta[name="csrf-token"]').content;
  useEffect(() => {
    const url = `/api/v1/forum_thread_comments/showCommentsForThread/${params.id}`;
    fetch(url)
      .then((res) => {
        if (res.ok) {
          console.log(res, "res");
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setForumThreadComments(res))
      .catch(/*() => navigate("/")*/);
  }, []);
  console.log(forumThreadComments, "forumThreadComments2");
  useEffect(() => {
    const url = "/api/v1/users/index";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setAllUsers(res))
      .catch(() => navigate("/"));
  }, []);
  const addHtmlEntities = (str) => {
    return String(str).replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  };
  const deleteForumThread = () => {
    const url = `/api/v1/forum_thread/destroy/${params.id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => navigate("/forumThreads"))
      .catch((error) => console.log(error.message));
  };

  const forumThreadBody = addHtmlEntities(forumThread.body);
  console.log(forumThread.body, "forumThreadBody");
  console.log(forumThreadBody, "forumThreadBody");
  // console.log(LongMenu(), "LongMenu");
  console.log(
    forumThreadComments[1],
    "forumThreadComments"
  );
 
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
    setBody("");
    event.preventDefault();
    const url = "/api/v1/forum_thread_comments/create";
    if (body.length == 0) return;

    const forumThreadCommentContent = {
      body: stripHtmlEntities(body),
      user_id: user.id,
      forum_thread_id: params.id,
    };

    console.log("body", body);
    console.log(forumThreadCommentContent.body, "forumThreadCommentContent");
    fetch(url, {
      method: "POST",
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
      .then()
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="">
      <div className="hero position-relative d-flex flex-column align-items-center justify-content-center">
        <div className="overlay bg-dark position-absolute" />
        <h1 className="display-4 position-relative text-white">
          {forumThread.title}
        </h1>
        <h4 className=" position-relative text-white">
          {forumThread.category}
        </h4>
      </div>

      <div className="container py-5">
        <div className="row">
          <div className="col-sm-12 col-lg-7">
            <h5 className="mb-2">Body</h5>
            <div
              dangerouslySetInnerHTML={{
                __html: `${forumThreadBody}`,
              }}
            />
          </div>

          {/* <img
          src={forumThread.image}
          className="card-img-top"
          alt={`${recipe.title} image`}
        /> */}

          <div className="row">
            <div className=" col-md-12 col-lg-12  mb-4">
              <form onSubmit={onSubmit}>
                <div className="form-group position-relative ">
                  <TextField
                    value={body}
                    style={{ textAlign: "left" }}
                    hinttext="Message Field"
                    floatinglabeltext="MultiLine and FloatingLabel"
                    multiline
                    rows={5}
                    className="card form-control"
                    onChange={(event) => onChange(event, setBody)}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary mb-2 custom-button position-absolute bottom-0 end-0  "
                  >
                    Comment
                  </button>
                </div>
              </form>
              {/* <h5 className="card-title">{forumThreadComments.body}</h5> */}
            </div>
          </div>
          <div className="row">
            {
              allForumThreadComments
        }
          </div>

          <div className="col-sm-12 col-lg-2">
            <button
              type="button"
              className="btn btn-danger"
              onClick={deleteForumThread}
            >
              Delete thread
            </button>
          </div>
        </div>
        <Link to="/forumThreads" className="btn btn-link">
          Back to threads
        </Link>
      </div>
    </div>
  );
};

export default ForumThread;
