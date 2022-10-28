import Dashboard from "./pages/dashboard/Dashboard";
import React from "react";
import Login from "./pages/login/Login";
import Singup from "./pages/singup/Singup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import Forget from "./pages/forget/Forget";
import Settings from "./pages/settings/Settings";
import Changepassword from "./pages/changepassword/Changepassword";

function App() {
  const { user } = useContext(Context);
  return (
    <div className="App">
      {/*<Login/>
   <Singup/>
      <Dashboard/>*/}

      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />

          <Route exact path="/Singup" element={<Singup />} />
          <Route
            exact
            path="/Dashboard"
            element={user ? <Dashboard /> : <Login />}
          />
          <Route exact path="/Forget" element={<Forget />} />
          <Route
            exact
            path="/Settings"
            element={user ? <Settings /> : <Login />}
          />
            <Route
            exact
            path="/changepassword"
            element={user ? <Changepassword /> : <Singup />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
