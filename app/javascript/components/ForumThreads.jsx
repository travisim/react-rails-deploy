import React, { useState, useEffect,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from './App';

const ForumThreads = () => {
  const navigate = useNavigate();

  const [forumThreads, setForumThreads] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  // const { user, setAllUsers } = useContext(UserContext);


  useEffect(() => {
    const url = "/api/v1/forum_thread/index";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setForumThreads(res))
      .catch(() => navigate("/"));
  }, []);
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
  // console.log(users, "uuuuuuuuussssserrr");
  // console.log(forumThreads, "forumThreads")
  const allForumThread = forumThreads.map((forumThread, index) => (
    <div key={index} className="col-md-12 col-lg-12">
      <div className="card mb-4">
        {/* <img
          src={forumThread.image}
          className="card-img-top"
          alt={`${recipe.title} image`}
        /> */}
        <div className="card-body">
          <h5 className="card-title">{forumThread.title}</h5>
          <h5 className="card-title">{forumThread.category}</h5>

          {/* <h5 className="card-title">{users.find(user => {return user.id === forumThread.user_id}).username}</h5> */}

          <Link
            to={`/forumThread/${forumThread.id}`}
            className="btn custom-button"
          >
            View Thread
          </Link>
        </div>
      </div>
    </div>
  ));
  const noForumThread = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No forumThread yet. Why not <Link to="/newForumThread">create one</Link>
      </h4>
    </div>
  );

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-5">
          <h1 className="display-4">ForumThread for every occasion</h1>
          <p className="lead text-muted">
            We’ve pulled together our most popular forumThread, our latest
            additions, and our editor’s picks, so there’s sure to be something
            tempting for you to try.
          </p>
        </div>
      </section>
      <div className="py-5">
        <main className="container">
          <div className="text-end mb-3">
            <Link to="/newForumThread" className="btn custom-button">
              Create New Thread
            </Link>

          </div>
          <div className="row">
            {forumThreads.length > 0 ? allForumThread : noForumThread}
          </div>
          <Link to="/" className="btn btn-link">
            Home
          </Link>
        </main>
      </div>
    </>
  );
};

export default ForumThreads;
