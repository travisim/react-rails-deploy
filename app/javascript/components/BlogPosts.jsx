import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const BlogPosts = () => {
    const navigate = useNavigate();

    const [blogPosts, setBlogPosts] = useState([]);
  
  useEffect(() => {
    const url = "/api/v1/blog_post/index";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setBlogPosts(res))
      .catch(() => navigate("/"));
  }, []);
    
  const allBlogPost = blogPosts.map((blogPost, index) => (
    <div key={index} className="col-md-6 col-lg-4">
      <div className="card mb-4">
        {/* <img
          src={blogPost.image}
          className="card-img-top"
          alt={`${recipe.title} image`}
        /> */}
        <div className="card-body">
          <h5 className="card-title">{blogPost.title}</h5>
          <Link to={`/blogPost/${blogPost.id}`} className="btn custom-button">
            View Blog Post
          </Link>
        </div>
      </div>
    </div>
  ));
  const noBlogPost = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No blogPost yet. Why not <Link to="/new_blog_post">create one</Link>
      </h4>
    </div>
  );

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-5">
          <h1 className="display-4">BlogPost for every occasion</h1>
          <p className="lead text-muted">
            We’ve pulled together our most popular blogPost, our latest
            additions, and our editor’s picks, so there’s sure to be something
            tempting for you to try.
          </p>
        </div>
      </section>
      <div className="py-5">
        <main className="container">
          <div className="text-end mb-3">
            <Link to="/blogPost" className="btn custom-button">
              Create New Recipe
            </Link>
          </div>
          <div className="row">
            {blogPosts.length > 0 ? allBlogPost : noBlogPost}
          </div>
          <Link to="/" className="btn btn-link">
            Home
          </Link>
        </main>
      </div>
    </>
  );
    
    
};


export default BlogPosts;