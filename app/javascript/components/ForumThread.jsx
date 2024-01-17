import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ForumThread = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [forumThread, setForumThread] = useState({ title: "" });

  useEffect(() => {
    const url = `/api/v1/show/${params.id}`;
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
  const addHtmlEntities = (str) => {
    return String(str).replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  };
  const deleteForumThread = () => {
    const url = `/api/v1/destroy/${params.id}`;
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

  return (
    
    <div className="">
      <div className="hero position-relative d-flex flex-column align-items-center justify-content-center">
        <div className="overlay bg-dark position-absolute" />
        <h1 className="display-4 position-relative text-white">
          {forumThread.title}
          

        </h1>
    <h4 className=" position-relative text-white">{forumThread.category}</h4>

        
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
