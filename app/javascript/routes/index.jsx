import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import ForumThreads from "../components/ForumThreads";
import ForumThread from "../components/ForumThread";
import NewForumThread from "../components/NewForumThread";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/forumThreads" element={<ForumThreads />} />
      <Route path="/forumThread/:id" element={<ForumThread />} />
      <Route path="/newForumThread" element={<NewForumThread />} />
    </Routes>
  </Router>
);
