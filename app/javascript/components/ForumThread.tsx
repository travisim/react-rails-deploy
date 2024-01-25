import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import TimeAgo from "react-timeago";
import { UserContext } from "./App";
interface ForumThread {
  title: string;
  body: string;
  category: string;
  author: string;
  user_id: number;
  created_at: string;
}

interface ForumThreadComment {
  id: number;
  body: string;
  author: string;
  user_id: number;
  created_at: string;
  
}

interface User {
  id: number;
  username: string;
  created_at: string;
  updated_at: string;
}
// {id: 2, username: 'dean', created_at: '2024-01-24T00:34:20.363Z', updated_at: '2024-01-24T00:34:20.363Z'}
const ForumThread = (): JSX.Element => {
  const params = useParams();
  const navigate = useNavigate();
  const [forumThread, setForumThread] = useState<ForumThread>({ title: "", body: "", category: "", author: "", user_id: 0, created_at: "" });
  const [body, setBody] = useState<String >("");
  const { user, setUser } = useContext(UserContext);

  const [forumThreadComments, setForumThreadComments] = useState<ForumThreadComment[]>([]);

 

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

  const addHtmlEntities = (str: string): string => {
    return String(str).replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  };

  const deleteForumThread = (): void => {
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

  const deleteForumThreadComments = (id: number): void => {
    const url = `/api/v1/forum_thread_comments/destroy/${id}`;
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
          fetchCommentsForThread();
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(console.log("deleted id", id))
      .catch((error) => console.log(error.message));
  };

  const forumThreadBody = addHtmlEntities(forumThread.body);

  const AccessControlComments = (forumThreadCommentID: number): JSX.Element | null => {
    if (user == null) return null;
    if (user.id == forumThreadCommentID) {
      return (
        <div>
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
                const id = forumThreadComments.id;
                deleteForumThreadComments(id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      );
    }
    return null;
  };

  const AccessControlThread = (forumThreadID: number): JSX.Element | null => {
    if (user == null) return null;
    if (user.id == forumThreadID) {
      return (
        <div>
          <button type="button" className="btn btn-danger" onClick={deleteForumThread}>
            Delete thread
          </button>
          <Link to={`/editForumThread/${forumThread.id}`} className="btn custom-button">
            Edit
          </Link>
        </div>
      );
    }
    return null;
  };

  const generateForumThreadCommentsHTML = (forumThreadComments: ForumThreadComment[]): JSX.Element[] => {
    const allForumThreadComments = forumThreadComments.map(
      (forumThreadComments, index) => (
        <div key={index} className="">
          <div className="card mb-4">
            <div className="card-body  col-lg-10">
              <h4
                className="card-text"
                dangerouslySetInnerHTML={{
                  __html: `${addHtmlEntities(forumThreadComments.body)}`,
                }}
              ></h4>
              <p>{forumThreadComments.author}</p>
              <TimeAgo date={forumThread.created_at} />
            </div>
            <div
              className="card-body  text-right  btn-toolbar "
              style={{ width: "18rem" }}
            >
              {AccessControlComments(forumThreadComments.user_id)}
            </div>
          </div>
        </div>
      )
    );
    return allForumThreadComments;
  };

  const NoForumThreadCommentsHTML = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No Comments yet, why not <Link to="/newForumThreadComments">create one</Link>
      </h4>
    </div>
  );

  const ForumThreadCommentsDeterminer = (forumThreadComments: ForumThreadComment[]): JSX.Element => {
    if (forumThreadComments.length > 0) {
      return generateForumThreadCommentsHTML(forumThreadComments);
    } else {
      return NoForumThreadCommentsHTML;
    }
  };

  const fetchCommentsForThread = (): void => {
    const url = `/api/v1/forum_thread_comments/showCommentsForThread/${params.id}`;
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => {
        setForumThreadComments(res);
      })
      .catch(/*() => navigate("/")*/);
  };

  useEffect(() => {
    fetchCommentsForThread();
  }, []);

  const stripHtmlEntities = (str: string): string => {
    return String(str)
      .replace(/\n/g, "<br> <br>")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>, setFunction: Function): void => {
    setFunction(event.target.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    const forumThreadCommentContent = {
      body: stripHtmlEntities(body),
      author: user.username,
      user_id: user.id,
      forum_thread_id: params.id,
    };
    setBody("");
    event.preventDefault();
    const url = "/api/v1/forum_thread_comments/create";
    if (body.length == 0) return;
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

  return (
    <div className="">
      <div className="hero position-relative d-flex flex-column align-items-center justify-content-center">
        <div className="overlay bg-dark position-absolute" />
        <h1 className="display-4 position-relative text-white">{forumThread.title}</h1>
        <h4 className=" position-relative text-white">{forumThread.category}</h4>
        <h4 className=" position-relative text-white">{forumThread.author}</h4>
        <div
          className=" position-relative text-white"
          dangerouslySetInnerHTML={{
            __html: `${forumThreadBody}`,
          }}
        />
      </div>
      <div className="container py-5">
        <div className="row">
          <div className="col-sm-12 col-lg-7"></div>
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
                    className="btn btn-primary custom-button position-absolute bottom-0 end-0"
                  >
                    Comment
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="row">{ForumThreadCommentsDeterminer(forumThreadComments)}</div>
          <div className="col-sm-12 col-lg-2">{AccessControlThread(forumThread.user_id)}</div>
        </div>
        <Link to="/forumThreads" className="btn custom-button ">
          Back to threads
        </Link>
      </div>
    </div>
  );
};

export default ForumThread;


