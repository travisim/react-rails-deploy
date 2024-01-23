import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { UserContext, AllUsersContext } from "./App";
// import LongMenu from "./MaxHeightMenu";
import TimeAgo from "react-timeago";

const ForumThread = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [forumThread, setForumThread] = useState({ title: "" });
  const [body, setBody] = useState("");
  const { user, setUser } = useContext(UserContext);
  const [allUsers, setAllUsers] = useState([]);

  const [textFieldValue, setTextFieldValue] = useState("");

  const [forumThreadComments, setForumThreadComments] = useState([]);
  // const [deleted, setDeleted] = useState(1);

  useEffect(() => {
    const url = "/api/v1/users/index";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => {
        setAllUsers(res);
      })
      .catch(() => navigate("/"));
  }, []);
  console.log(allUsers, "AllUsers");
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
      .catch(() => navigate("/forumThreads"));
  }, [params.id]);

  const token = document.querySelector('meta[name="csrf-token"]').content;

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
  const deleteForumThreadComments = (id) => {
    const url = `/api/v1/forum_thread_comments/destroy/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;
    // setDeleted(deleted+1);
    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          fetchCommentsForThread();
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      // .then(console.log("deleted id", id))
      .catch((error) => console.log(error.message));
  };
  const forumThreadBody = addHtmlEntities(forumThread.body);
  function generateForumThreadCommentsHTML(forumThreadComments) {
    // if (allUsers == null) {
    //   return;
    // }
    const allForumThreadComments = forumThreadComments.map(
      (forumThreadComments, index) => (
        <div key={index} className="">
          <div className="card mb-4">
            <div className="card-body  col-lg-10">
              {/* <div className="col-sm-12 col-lg-7"> */}
              <h4
                className="card-text"
                dangerouslySetInnerHTML={{
                  __html: `${addHtmlEntities(forumThreadComments.body)}`,
                }}
              ></h4>
              <p>{forumThreadComments.author}</p>
            <TimeAgo date={forumThread.created_at} /> 

              {/* </div> */}
           

              {/* <Link
              to={`/forumThreadComments/${forumThreadComments.id}`}
              className="btn custom-button"
            >
              View comment
            </Link> */}
            </div>
            <div
              className="card-body  text-right  btn-toolbar "
              style={{ width: "18rem" }}
            >
              <div className="btn-group mr-2" role="group">
                <Link
                  to={`/editForumThreadComment/${forumThreadComments.id}`}
                  className="btn custom-button"
                >
                  Edit
                </Link>
              </div>
              <div className="btn-group mr-2" role="group">
                <button
                  type="button"
                  className="btn btn-danger "
                  onClick={(event) => {
                    // deleteForumThreadComment();
                    const id = forumThreadComments.id;
                    deleteForumThreadComments(id);
                    console.log(id);
                  }}
                >
                  Delete
                </button>
              </div>
              {/* <LongMenu/> */}
            </div>
          </div>
        </div>
      )
    );
    return allForumThreadComments;
  }
  const NoForumThreadCommentsHTML = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No Comments yet. Why not{" "}
        <Link to="/newForumThreadComments">create one</Link>
      </h4>
    </div>
  );
  function ForumThreadCommentsDeterminer(forumThreadComments) {
    if (forumThreadComments.length > 0) {
      return generateForumThreadCommentsHTML(forumThreadComments);
    } else {
      return NoForumThreadCommentsHTML;
    }
  }

  function fetchCommentsForThread() {
    const url = `/api/v1/forum_thread_comments/showCommentsForThread/${params.id}`;
    fetch(url)
      .then((res) => {
        if (res.ok) {
          console.log(res, "res");
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => {
        console.log(res, "res comments");
        setForumThreadComments(res);

        // console.log("running", deleted);
      })
      .catch(/*() => navigate("/")*/);
  }
  useEffect(() => {
    fetchCommentsForThread();
  }, []);
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
      author: user.username,

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
          fetchCommentsForThread();

          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then()
      .catch((error) => console.log(error.message));
  };
  console.log(allUsers, "allUsers");
  console.log(forumThreadComments, "forumThreadComments");
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
        <h4 className=" position-relative text-white">
          { forumThread.author }
        </h4>
        <div
          className=" position-relative text-white"
          dangerouslySetInnerHTML={{
            __html: `${forumThreadBody}`,
          }}
        />
      </div>

      <div className="container py-5">
        <div className="row">
          <div className="col-sm-12 col-lg-7">
            {/* <h5 className="mb-2">Body</h5> */}
          </div>

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
                    // defaultValue="Add Comments"
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
          <div className="row">{ForumThreadCommentsDeterminer(forumThreadComments)}</div>

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

        <Link to="/forumThreads" className="btn custom-button ">
          Back to threads
        </Link>
      </div>
    </div>
  );
};

export default ForumThread;
