import React, { useState, useEffect, createContext } from "react";
import ReactDOM from "react-dom/client";
// import Routes from "../routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ForumThreads from "./ForumThreads";
import ForumThread from "./ForumThread";
import NewForumThread from "./NewForumThread";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
// import ForumThreadComments from "./ForumThreadComments";

import ResponsiveAppBar from "./ResponsiveAppBar";

export const UserContext = createContext();
export const TokenContext = createContext();

// export default props => <div>{Routes}</div>;
// export const UserContext = React.createContext(null)
const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  console.log("localStorage.token", localStorage.token);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetch("/login", {
        headers: { Authenticate: localStorage.token },
      })
        .then((response) => response.json())
        .then((user) => {
          setUser(user);
        });
    }
  }, []);

  function handleLogout() {
    setUser(null);
    localStorage.removeItem("token");
    navigate(`/forumThreads`);
    console.log("logged out");
  }

  console.log(user, "user", "app");
  return (
    <div>
      <Router>
        <UserContext.Provider value={{ user: user, setUser: setUser }}>
          <TokenContext.Provider value={{ token: token, setToken: setToken }}>
            <ResponsiveAppBar />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/forumThreads" element={<ForumThreads />} />
              {/* <Route path="/forumThreadComments" element={<ForumThreadComments />}/> */}
              <Route path="/forumThread/:id" element={<ForumThread />} />
              <Route path="/newForumThread" element={<NewForumThread />} />
              <Route path="/signIn" element={<SignIn />} />
              <Route path="/signUp" element={<SignUp />} />
            </Routes>
          </TokenContext.Provider>
        </UserContext.Provider>
      </Router>
    </div>
  );
};
export default App;
