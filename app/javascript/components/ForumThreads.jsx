import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./App";
import { Create, CreateNewFolder } from "@mui/icons-material";
import TimeAgo from 'react-timeago';



const ForumThreads = () => {
  const navigate = useNavigate();

  const [forumThreads, setForumThreads] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("All");

  const { user, setUsers } = useContext(UserContext);

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
  function fetchAllThreads() {
    useEffect(() => {
      const url = "/api/v1/forum_thread/index";
      fetch(url)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then((res) => {
          setForumThreads(res);
          console.log(res[0], "res");
          // console.log(allUsers.find((user) => user.id == 5).username);
        })
        .catch(() => navigate("/"));
    }, []);
  }
  fetchAllThreads();
  function CreateNewThreadButton() {
    return (
      <Link to="/newForumThread" className="btn custom-button">
        Create New Thread
      </Link>
    );
  }

  const NoForumThreadHTML = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>No Forum Threads here yet.</h4>
    </div>
  );
  function ForumThreadDeterminer(forumThread) {
    console.log(forumThread, "forumThread99");
    if (forumThread.length > 0) {
      return generateForumThreadHTML(forumThread);
    } else {
      return NoForumThreadHTML;
    }
  }
  function fetchForumThreadsByCategory(category) {
    const url = `/api/v1/forum_thread/showForumThreadsByCategory/${category}`;
    fetch(url)
      .then((res) => {
        if (res.ok) {
          console.log(res, "res");
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => {
        setForumThreads(resForumThreadDeterminer);

        // console.log("running", deleted);
      })
      .catch(/*() => navigate("/")*/);
  }
  function FilterbyCategory(event) {
    console.log(event.target.value, "event.target.value");
    setCurrentFilter(event.target.value);
    if (event.target.value === "All") {
      fetchAllThreads();
    } else {
      fetchForumThreadsByCategory(event.target.value);
    }
  }

  console.log(allUsers, "uuuuuuuuussssserrr2");
  console.log(
    allUsers.find((user) => user.id == 5)
      ? allUsers.find((user) => user.id == 5).username
      : null,
    "uuuuuuuuussssserrr"
  );

  // console.log(forumThreads[0], "forumThreads");
  function generateForumThreadHTML(forumThreads) {
    console.log(forumThreads, "uuuuuuuuussssserrr4");

    const allForumThread = forumThreads.map((forumThread, index) => (
      <div key={index} className="col-md-12 col-lg-12">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">{forumThread.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{forumThread.category}</h6>
            {/* <h5 className="card-title">
              {allUsers.find((user) => user.id == forumThread.user_id)
                ? allUsers.find((user) => user.id == forumThread.user_id).username:"feef"
                }
            </h5> */}
            <p className="card-text">

              Posted by { allUsers.find((user) => user.id == forumThread.user_id).username
              }
            </p>

            <div className="card-text">

            <TimeAgo date={forumThread.created_at} /> 
            </div>
            {/* <h5 className="card-title">{forumThread.user_id}</h5> */}
            {/* <h5 className="card-title">
              {allUsers.find((user) => {
                return user.id == forumThread.user_id;
              })}
            </h5> */}
            <Link
              to={`/forumThread/${forumThread.id}`}
              className="btn custom-button"
            >
              View Thread
            </Link>
            <Link
              to={`/editForumThread/${forumThread.id}`}
              className="btn custom-button"
            >
              Edit
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
            {user === null ? null : CreateNewThreadButton()}
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
                // value={forumThread.category}
                // onChange={FilterbyCategory}
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
          <div className="row">{generateForumThreadHTML(forumThreads)}</div>
          <Link to="/" className="btn btn-link">
            Home
          </Link>
        </main>
      </div>
    </>
  );
};

export default ForumThreads;
