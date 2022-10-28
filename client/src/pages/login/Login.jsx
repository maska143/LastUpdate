import React from "react";
import "./login.css";
import { useContext, useRef ,useState } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { user, dispatch, isFetching } = useContext(Context);
  const [error, seterror] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });

      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      console.log(res.data);
      res.data && window.location.replace("/dashboard");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      seterror(true)
      console.log(err);
    }
  };

  return (
    <div className="login">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-container">
          <p className="login-span">username</p>
          <input type="text" className="usernamee" ref={userRef} />
          <p className="login-span">password</p>
          <input type="password" className="passwordd" ref={passwordRef} />
          <button
            type="submit"
            className="btn btn-primary"
            placeholder="Login">
              Log in
            </button>
            {error && <span style={{marginTop : "10px"}}>wrong credentials</span>}

          <Link to="/singup" className="link">
            <p className="signup-link">Sing up</p>
          </Link>
          <Link className="linkk" to="/forget">
              <p className="forget">forget password</p>
            </Link>
        </div>
      </form>
    </div>
  );
}
