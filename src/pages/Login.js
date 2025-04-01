import React, { useState } from "react";
import { instance } from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/user";

function Login() {
  const [data, setData] = useState({});
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const naviagte = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleLogin = async () => {
    if (!data.username || !data.password) {
      return setError("Please fill email and password");
    }
    setIsLoading(true);
    instance
      .post("/user/login", data)
      .then((res) => {
        if (res.data.token) {
          alert("Logged in Successfully");
          const user = {
            name: res.data.name,
            id: res.data.id,
            token: res.data.token,
          };
          localStorage.setItem("user", JSON.stringify(user));
          dispatch(login(user));
          return naviagte("/");
        } else {
          setError("Invalid username or password");
        }
      })
      .catch((err) => {
        setError("Invalid username or password");
      })
      .finally(() => {
        setIsLoading(false);
      });
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
      <p>{error && error}</p>
      <button onClick={handleLogin}>{loading ? "Loading..." : "Login"}</button>
      <p style={{ textAlign: "center", margin: "10px 0px 5px" }}>
        Do not have an Account?
      </p>
      <button onClick={() => naviagte("/signup")}>Sign Up</button>
    </div>
  );
}

export default Login;
