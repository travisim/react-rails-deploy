import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const BlogPost = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [blogPost, setBlogPost] = useState({ title: "" });

  useEffect(() => {
    const url = `/api/v1/show/${params.id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setBlogPost(response))
      .catch(() => navigate("/blogPosts"));
  }, [params.id]);
  const addHtmlEntities = (str) => {
    return String(str).replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  };
  const deleteBlogPost = () => {
    const url = `/api/v1/destroy/${params.id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => navigate("/blogPosts"))
      .catch((error) => console.log(error.message));
  };

  const blogPostBody = addHtmlEntities(blogPost.body);

  return (
    <div className="">
      <div className="hero position-relative d-flex align-items-center justify-content-center">
        <div className="overlay bg-dark position-absolute" />
        <h1 className="display-4 position-relative text-white">
          {blogPost.title}
        </h1>
      </div>
      <div className="container py-5">
        <div className="row">
          <div className="col-sm-12 col-lg-7">
            <h5 className="mb-2">Body</h5>
            <div
              dangerouslySetInnerHTML={{
                __html: `${blogPostBody}`,
              }}
            />
          </div>
          <div className="col-sm-12 col-lg-2">
            <button type="button" className="btn btn-danger"  onClick={deleteBlogPost}>
              Delete blog post
            </button>
          </div>
        </div>
        <Link to="/blogPosts" className="btn btn-link">
          Back to blog posts
        </Link>
      </div>
    </div>
  );
};

export default BlogPost;
