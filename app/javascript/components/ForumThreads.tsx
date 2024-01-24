import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./App";
import TimeAgo from "react-timeago";
const ForumThreads = () => {
  const navigate = useNavigate();
  const [forumThreads, setForumThreads] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("All");
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    const url = "/api/v1/users/index";
    fetch(url)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(res => setAllUsers(res))
      .catch(() => navigate("/"));
  }, []);
  const NoForumThreadHTML = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>No Forum Threads In This Category yet.</h4>
    </div>
  );
  function ForumThreadDeterminer(forumThread) {
    if (forumThread.length > 0) {
      return generateForumThreadHTML(forumThread);
    } else {
      return NoForumThreadHTML;
    }
  }
  useEffect(() => {
    const url = "/api/v1/forum_thread/index";
    fetch(url)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(res => setForumThreads(ForumThreadDeterminer(res)))
      .catch(() => navigate("/"));
  }, []);
  function fetchForumThreadsByCategory(category) {
    const url = `/api/v1/forum_thread/showForumThreadsByCategory/${category}`;
    fetch(url)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(res => {
        setForumThreads(ForumThreadDeterminer(res));
      })
      .catch();
  }
  function FilterbyCategory(event) {
    setCurrentFilter(event.target.value);
    fetchForumThreadsByCategory(event.target.value);
  }
  // function AccessControlThreads(forumThreadUserID) {
  //   console.log(user.id, "user.id");
  //   if (user.id == forumThreadUserID) {
  //     return (<Link
  //       to={`/editForumThread/${forumThread.id}`}
  //       className="btn custom-button"
  //     >
  //       Edit
  //     </Link>);
  //   }
  // }
  function generateForumThreadHTML(forumThreads) {
    const allForumThread = forumThreads.map((forumThread, index) => (
      <div key={index} className="col-md-12 col-lg-12">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">{forumThread.title}</h5>
            <h6 className="card-title">{forumThread.category}</h6>
            <p className="card-subtitle mb-2 text-muted">
              Posted by {forumThread.author}{" "}
              <TimeAgo date={forumThread.created_at} />{" "}
            </p>

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
    return allForumThread;
  }
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
          <h1 className="display-4">Forum Threads</h1>
          <p className="lead text-muted">Discuss about life in NUS</p>
        </div>
      </section>
      <div className="py-5">
        <main className="container">
          <div className="text-end mb-3">
            <Link to="/newForumThread" className="btn custom-button">
              Create New Thread
            </Link>
          </div>
          <div className=" text-end mb-3">
            <label htmlFor="category">
              Filter by Category
              <select
                type="text"
                name="category"
                id="category"
                className="form-control"
                required
                onChange={FilterbyCategory}
                defaultValue="All"
              >
                <option value="All">All</option>
                <option value="Question">Question</option>
                <option value="Discussion">Discussion</option>
                <option value="Off-Advice">Off-Advice</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>
          <div className="row">{forumThreads}</div>
          <Link to="/" className="btn custom-button">
            About
          </Link>
        </main>
      </div>
    </>
  );
};
export default ForumThreads;
