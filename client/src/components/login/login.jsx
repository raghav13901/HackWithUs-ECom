import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import  "./login.css";
import img from "../../assets/undraw_mobile_login_ikmv.svg";
import Navbar from "../navbar/navbar";

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push(`/dashboard/${localStorage.getItem("id")}`);
    }else{
      history.push('/login');
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const {data}  = await axios.post(
        "/api/auth/login",
        { email, password },
      );
      
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("id", data.id);
      localStorage.setItem("table", data.dbName);
      console.log(data);
      history.push(`/dashboard/${localStorage.getItem("id")}`);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="loginScreen">
      <Navbar/>
      <div className="logRow row align-items-center">
        <div className="col-lg-8 logImg">
          <img src={img} alt="LogIn Img"/>
        </div>
        <div className="col-lg-4">
          <form onSubmit={loginHandler} className="logForm shadow-lg rounded">
            <h2 className="text-center">Login</h2>
            {error && <span className="error-message">{error}</span>}
            <div className="logFRow form-group">
              <div className="row align-items-center">
                <div className="col-1 text-left">
                  <label htmlFor="email"><i className="fas fa-envelope fa-lg"></i></label>
                </div>
                <div className="col-11 textF">
                  <input
                  type="email"
                  required
                  id="email"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  tabIndex={1}
                  />
                </div>
              </div>
            </div>
            <div className="logFRow form-group">
              <div className="row align-items-center">
                <div className="col-1 text-left">
                  <label htmlFor="password"><i className="fas fa-key fa-lg"></i></label>
                </div>
                <div className="col-11 textF">
                  <input
                  type="password"
                  required
                  id="password"
                  autoComplete="true"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  tabIndex={2}
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{width:"100%"}}>
              Login
            </button>

            <div className="register">
              Don't have an account? <Link to="/register">Register</Link>
            </div>
          </form>
        </div>
      </div>
      
    </div>
  );
};

export default LoginScreen;