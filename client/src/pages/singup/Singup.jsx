import React from "react";
import "./singup.css";
import { useState, useEffect, useLocation } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Singup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [midllename, setMidllename] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [same, setSame] = useState(false);
  const [error, seterror] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/singup/", {
        firstname,
        midllename,
        lastname,
        username,
        email,
        phonenumber,
        password,
        confirmpassword,
      });
      res.data && window.location.replace("/");
      console.log(res);
    } catch (err) {
      console.log(err);
      seterror(true)
    }
  };
  const handleconfrim = async (e) => {
    if (password.value === confirmpassword.value) {
      setSame(true);
    } else {
      setSame(false);
    }
  };
  return (
    <div className="singup">
      <form className="singup-form" onSubmit={handleSubmit}>
        <div className="group-one">
          <p className="group-one-span">firstname</p>
          <input
            type="text"
            className="group-one-input"
            onChange={(e) => setFirstname(e.target.value)}
          />
          <p className="group-one-span">midllename</p>
          <input
            type="text"
            className="group-one-input"
            onChange={(e) => setMidllename(e.target.value)}
          />
          <p className="group-one-span">lastname</p>
          <input
            type="text"
            className="group-one-input"
            onChange={(e) => setLastname(e.target.value)}
          />
          <p className="group-one-span">password</p>
          <input
            type="password"
            className="group-one-input"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="group-one-span">Confirm password</p>
          <input
            type="password"
            className="group-one-input"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && <span style={{marginTop : "10px"}}>password and confirm password must be same</span>}
          <button type="submit" className="group-one-btn">
            Singup
          </button>
          <div className="group-one-sub">
            {" "}
            <Link className="link" to="/">
              {" "}
              <span className="singup-login">log in</span>
            </Link>
            
          </div>
        </div>
        <div className="group-two">
          <p className="group-two-span">username</p>
          <input
            type="text"
            className="group-two-input"
            onChange={(e) => setUsername(e.target.value)}
          />
          <p className="group-two-span">Email</p>
          <input
            type="email"
            className="group-two-input"
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="group-two-span">phonenumber</p>
          <input
            type="number"
            className="group-two-input"
            onChange={(e) => setPhonenumber(e.target.value)}
          />
        </div>
      </form>
  
    </div>
  );
}
