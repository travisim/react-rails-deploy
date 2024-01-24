import React, { useEffect, useState, useContext, createContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./App";

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const { user, setUser } = useContext(UserContext);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>, setFunction: React.Dispatch<React.SetStateAction<string>>) => {
    setFunction(event.target.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = "/api/v1/users/create";
    if (username.length === 0) return;
    const signInContent = {
      username
    };
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signInContent),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Username already exists");
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        navigate(`/forumThreads`);
      })
      .catch((error) => console.log(error.message));
  };

  return (


    <div className="container mt-5">
      <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            Sign Up
          </h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Username</label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                required
                onChange={(event) => onChange(event, setUsername)}
              />
            </div>
            <button type="submit" className="btn custom-button mt-3">
              Sign Up
            </button>
            <Link to="/forumThreads" className="btn custom-button mt-3 ">
              Back to threads
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
