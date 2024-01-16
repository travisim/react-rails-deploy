
import React, { useState, useEffect,createContext } from "react";
import ReactDOM from "react-dom/client"
// import Routes from "../routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ForumThreads from "./ForumThreads";
import ForumThread from "./ForumThread";
import NewForumThread from "./NewForumThread";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

import ResponsiveAppBar from "./ResponsiveAppBar";


export const UserContext = createContext();
// export default props => <div>{Routes}</div>;
// export const UserContext = React.createContext(null)
const App = () => {
    const [user, setUser] = useState(null);

    // console.log(user, "user","app")
  return (
    <div>
        <Router>
        <UserContext.Provider value={{ user: user, setUser: setUser }}>
          <ResponsiveAppBar />
          
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/forumThreads" element={<ForumThreads />} />
          <Route path="/forumThread/:id" element={<ForumThread />} />
          <Route path="/newForumThread" element={<NewForumThread />} />
            <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          
          </Routes>
          </UserContext.Provider>
        </Router>
          
          
      </div>
          );
          
};
export default App;