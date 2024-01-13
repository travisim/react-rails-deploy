import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import BlogPosts from "../components/BlogPosts";
import BlogPost from "../components/BlogPost";
import NewBlogPost from "../components/NewBlogPost";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blogPosts" element={<BlogPosts />} />
      <Route path="/blogPost/:id" element={<BlogPost />} />
      <Route path="/blogPost" element={<NewBlogPost />} />
    </Routes>
  </Router>
);
