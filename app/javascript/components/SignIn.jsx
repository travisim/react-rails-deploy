import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [user, setUser] = useState([]);

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const url = "/api/v1/users/create";

    if (username.length == 0) return;

    const signInContent = {
      username
    };
    // // console.log(token, "token")
    // fetch('/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(signInContent),
    // })
    //   .then(response => response.json())
    //   .then((data) => {
       
    // setToken(data.token);
    //     setUser(data.user);
    //   })

    // // console.log(token, "token")

    console.log(signInContent, "signInContent");
    
    const token = document.querySelector('meta[name="csrf-token"]').content;
  //   fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "X-CSRF-Token": token,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(signInContent),
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       }
  //       throw new Error("Network response was not ok.");
  //     })
  //     .then((response) => navigate(`/forumThreads`))
  //     .catch((error) => console.log(error.message));
  // };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            Sign In
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
              Sign In
            </button>
            <Link to="/forumThreads" className="btn btn-link mt-3">
              Back to recipes
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
