import React from "react";
// import Routes from "../routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from ".Home";
import ForumThreads from "./ForumThreads";
import ForumThread from ".ForumThread";
import NewForumThread from "./NewForumThread";
import SignIn from "./SignIn";

// export const UserContext = React.createContext(null);
// export default props => <div>{Routes}</div>;

const App = () => {
    // const [user, setUser] = useState(null);
    return (
        <Router>
    {/* <UserContext.Provider value={{ user: user, setUser: setUser }}></UserContext.Provider> */}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/forumThreads" element={<ForumThreads />} />
      <Route path="/forumThread/:id" element={<ForumThread />} />
      <Route path="/newForumThread" element={<NewForumThread />} />
      <Route path="/signIn" element={<SignIn />} />

    </Routes>
  </Router>
        

    );
    
};