import React, { useEffect, useState, useContext,createContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./App";

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const { user, setUser } = useContext(UserContext);
  
  
  
  // console.log("sds",typeof(user),typeof(setUser), "user") 
  // console.log("user",user)
 
  
  // useEffect(() => {
  //   if (token) { 
  //     fetch('/login', {
  //       headers: { "Authenticate": token }
  //     })
  //     .then(response => response.json())
  //     .then(user => {
  //         setUser(user)
  //       })
  //     }
  // }, []);
  // console.log("user", user)
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
    // console.log(token, "token")
    if (user === null) {
      
    }
    // console.log("user",user)
    
    
    
    // console.log(token, "token")
    
    console.log(signInContent, "signInContent");
    
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signInContent),
    })
      .then((response) => {
      console.log(response, "response1")
        if (response.ok) {
          // isUserCreated = true;
          // alert("User Created")
          // isUserCreated = true;
        return response.json();
        }
        else {
          alert("Username already exists")
          // isUserCreated = false;

        }
        throw new Error("Network response was not ok.");
      
    })
      .then((response) => {
        // setTimeout(() => {
        //   navigate(`/forumThreads`)
        // },5000)
        navigate(`/forumThreads`)
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
            
        <Link to="/forumThreads" className="btn custom-button ">
          Back to threads
        </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
