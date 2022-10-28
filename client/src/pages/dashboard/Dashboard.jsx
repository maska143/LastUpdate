import React from "react";
import "./dashboard.css";
import { Context } from "../../context/Context";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user, dispatch, isFetching } = useContext(Context);

  const PF = "http://localhost:5001/images/";

  const handlelogout = async () => {
    dispatch({ type: "LOGOUT" });
    window.location.replace("/");
  };
  return (
    <div className="dashboard">
      <div className="navbar">
        <ul className="navitems">
          <li className="items">Account</li>
          <li className="items">settings</li>
          <li className="items">About Us</li>
          <li className="items">help</li>
        </ul>
        <div className="pp">
        <Link  to ="/settings"> <img className="topImg" src={PF + user.profilePic} alt="" /></Link>
         
        </div>
        <div className="nav-btn">
          <button className="items-logout" onClick={handlelogout}>
            Log out
          </button>
        </div>
      </div>
      <div className="dashboard-big-title">
        <p className="dashboard-big-title-txt"> Welcome to the dashboard</p>
      </div>
      <p className="dashboard-announcement">Coming soon</p>
      <div className="allcard">
        <div className="card-one">
          <img
            className="card-img"
            src="https://images.pexels.com/photos/1476321/pexels-photo-1476321.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
          />
          <p className="card-title">service</p>
        </div>
        <div className="card-two">
          <img
            className="card-img"
            src="https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt=""
          />
          <p className="card-title">product</p>
        </div>
        <div className="card-three">
          <img
            className="card-img"
            src="https://images.pexels.com/photos/1416530/pexels-photo-1416530.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt=""
          />
          <p className="card-title">call</p>
        </div>
      </div>

      <footer>
        <ul className="footeritems">
          <li className="item">Account</li>
          <li className="item">settings</li>
          <li className="item">help</li>
        </ul>
      </footer>
    </div>
  );
}
