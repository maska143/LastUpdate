import "../settings/settings.css";
import { Link } from "react-router-dom";
import React from "react";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Changepassword() {
  const [inputs, setInputs] = useState("");

  const [error, seterror] = useState(false);

  const { user, dispatch } = useContext(Context);
 

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    if (inputs.password.value !== inputs.confirmpassword.value) {
      dispatch({ type: "UPDATE_FAILURE" });
    } else {
      const updatedUser = {
        userId: user._id,
        password: inputs.password,
        confirmpassword: inputs.confirmpassword,
      };

      try {
        if (inputs.password === inputs.confirmpassword) {
          const res = await axios.put("/users/" + user._id, updatedUser);

          dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
          res.data && window.location.replace("/");
        } else {
          dispatch({ type: "UPDATE_FAILURE" });
          seterror(true);
        }
      } catch (err) {
        dispatch({ type: "UPDATE_FAILURE" });
 
      }
    }
  };
  return (
    <div className="settings">
      <form className="singup-form" onSubmit={handleSubmit}>
        <div className="group-one">
          <p className="group-one-span">password</p>
          <input
            type="password"
            className="group-one-input"
            onChange={handleChange}
            name="password"
          />
          <p className="group-one-span">confirm password</p>
          <input
            type="password"
            className="group-one-input"
            onChange={handleChange}
            name="confirmpassword"
          />
          <button type="submit" className="group-one-btn">
            Update infromation
          </button>
          {error && <span style={{marginTop : "10px"}}>password and confirm password must be same</span>}
        </div>
      </form>
    </div>
  );
}
