import React from "react";
import "./forget.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useContext, useRef } from "react";
import { Context } from "../../context/Context";



export default function Forget() {
  const [forget, setForget] = useState();
  const otpRef = useRef();
  const emailRef = useRef();


  const { user, dispatch } = useContext(Context);
  const [email, setEmail] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: "FORGET_STARTT" });
    try {
      const res = await axios.post("/auth/send-otp/", {
        email,
      });
      setForget(true);

      console.log(res);
    } catch (err) {
      dispatch({ type: "FORGET_FAILURE" });
      console.error(err);
    }
  };

  const handle = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post("/auth/verify/", {
        code: otpRef.current.value,
        email: emailRef.current.value,
      });
  
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      res.data && window.location.replace("/changepassword");
      console.log(res);
    } catch (err) {
      console.log(err);
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };


  return (
    <div className="forget">
      {forget ? (
        <>
          <h1 className="title-forget">Enter the OTP</h1>

          <form className="forget-form" onSubmit={handle}>
            <p className="forget-span">Email</p>
            <input className="forget-input" type="email" ref={emailRef} />
            <p className="forget-span">OTP</p>
            <input className="forget-input" type="number" ref={otpRef} />

            <button type="submit" className="forget-btn">
              Forget password
            </button>
            <div className="group-one-forget">
              <i class="fa-solid fa-arrow-left"></i>
              <Link className="linkK" to="/">
                <p className="back-to-login">back to login</p>
              </Link>
            </div>
          </form>

        
        </>
      ) : (
        <>
          <h1 className="title-forget">forget password</h1>
          <form className="forget-form" onSubmit={handleSubmit}>
            <p className="forget-span">Email</p>
            <input
              className="forget-input"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="forget-btn">
              Forget password
            </button>
            <div className="group-one-forget">
              <i class="fa-solid fa-arrow-left"></i>
              <Link className="linkK" to="/">
                <p className="back-to-login">back to login</p>
              </Link>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
