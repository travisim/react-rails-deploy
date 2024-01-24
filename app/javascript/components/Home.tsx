import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <h1 className="display-4">Forum Threads</h1>
        <p className="lead">
          Post threads which others can comment on.
          Share your thoughts and experiences in NUS.
        </p>
        <hr className="my-4" />
        <Link
          to="/forumThreads"
          className="btn btn-lg custom-button"
          role="button"
        >
          View Forum Threads
        </Link>
      </div>
    </div>
  </div>
);