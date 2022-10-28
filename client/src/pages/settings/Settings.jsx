import "./settings.css";
import { Link } from "react-router-dom";
import React from "react";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";


export default function Settings() {
  const [file, setFile] = useState(null);
  const [inputs,setInputs] = useState("");

  


  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5001/images/";



  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
  });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username:inputs.username,
      email:inputs.email,
      password:inputs.password,
      firstname:inputs.firstname,
      lastname:inputs.lastname,
      midllename:inputs.midllename,
      phonenumber:inputs.phonenumber,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);

      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      res.data && window.location.replace("/dashboard")
  
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  return (
    <div className="settings">
      <form className="singup-form" onSubmit={handleSubmit}>
        <div className="settingsPP">
          j
          <img
            src={file ? URL.createObjectURL(file) : PF + user.profilePic}
            alt=""
          />
          <label htmlFor="fileInput">
            <i className="settingsPPIcon far fa-user-circle"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
          
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="group-one">
          <p className="group-one-span">firstname</p>
          <input
            type="text"
            className="group-one-input"
            placeholder={user.firstname}
            name="firstname"
            onChange={handleChange}
          />
          <p className="group-one-span">midllename</p>
          <input
            type="text"
            className="group-one-input"
            placeholder={user.midllename}
            onChange={handleChange}
            name="midllename"
          />
          <p className="group-one-span">lastname</p>
          <input
            type="text"
            className="group-one-input"
            placeholder={user.lastname}
            onChange={handleChange}
            name="lastname" 
          />
          <p className="group-one-span">password</p>
          <input
            type="password"
            className="group-one-input"
            onChange={handleChange}
            name="password"
          />
          <button type="submit" className="group-one-btn">
            Update infromation
          </button>
        </div>
        <div className="group-two">
          <p className="group-two-span">username</p>
          <input
            type="text"
            className="group-two-input"
            placeholder={user.username}
            onChange={handleChange}
            name="username"
          />
          <p className="group-two-span">Email</p>
          <input
            type="email"
            className="group-two-input"
            placeholder={user.email}
            onChange={handleChange}
            name="email"
          />
          <p className="group-two-span">phonenumber</p>
          <input
            type="number"
            className="group-two-input"
            placeholder={user.phonenumber}
            name="phonenumber"
            onChange={handleChange}
          />
        </div>
       
      </form>
    </div>
  );
}
