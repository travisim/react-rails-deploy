import React, { useEffect, useState, useContext, createContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./App";

const SignIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const { user, setUser } = useContext(UserContext);
  const [isUserCreated, setIsUserCreated] = useState<string>("");
  
  const onChange = (event: React.ChangeEvent<HTMLInputElement>, setFunction: React.Dispatch<React.SetStateAction<string>>) => {
    setFunction(event.target.value);
  };
  
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = "/api/v1/users/create";
    if (username.length === 0) return;
    const signInContent = {
      username,
    };
    if (user === null) {
      // do something
    }
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signInContent),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert("user does not exists");
        }
        localStorage.setItem("token", data.token);
        setUser(data.user);
        navigate(`/forumThreads`);
      });
  };
  
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">Sign In</h1>
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
              Sign In
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

export default SignIn;
