import React, { useState } from "react";
import { instance } from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/user";

function Signup() {
  const [data, setData] = useState({});
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const naviagte = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    setError("");
    setLoading(true);
    if (!data.username || !data.password || !data.confirmpassword) {
      setLoading(false);
      return setError("Please fill all the details");
    }
    if (data.password !== data.confirmpassword) {
      setLoading(false);
      return setError("Passwords do not match");
    }
    instance
      .post("user/adduser", {
        username: data.username,
        password: data.password,
      })
      .then((res) => {
        if (res.data.message === "Failed to create the user") {
          return setError("username already exists");
        }
        if (res.data.token) {
          dispatch(
            login({
              token: res.data.token,
              name: res.data.username,
              id: res.data.id,
            })
          );
          setLoading(false);
          alert("Signed up successfully");
          setError("You have signed up successfully");
          naviagte("/");
        }
      })
      .catch((error) => setError("user already exists"));
  };

  return (
    <div className="login--container">
      <div className="input--container">
        <label htmlFor="username">Username</label>
        <input type="text" name="username" onChange={(e) => handleChange(e)} />
      </div>
      <div className="input--container">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="input--container">
        <label htmlFor="password">Confirm Password</label>
        <input
          type="password"
          name="confirmpassword"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <p>{error && error}</p>
      <button onClick={handleLogin}>
        {loading ? "Loading..." : "Sign Up"}
      </button>
    </div>
  );
}

export default Signup;
