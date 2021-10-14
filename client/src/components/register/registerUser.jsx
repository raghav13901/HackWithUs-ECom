import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./register.css";
import img from "../../assets/undraw_authentication_fsn5 (3).svg";
import Navbar from "../navbar/navbar";

const RegisterUserScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [address, setAddress] = useState("");
  const [phNo, setPhone] = useState();
  const [shopName, setShopName] = useState(" ");
  const [desc, setDesc] = useState(" ");
  const type = 'Customer';
  const registerHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    try {
      const { data } = await axios.post(
        "/api/auth/register",
        {
          name,
          email,
          password,
          address,
          phNo,
          shopName,
          type,
          desc
        },
      );

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("id", data.id);
      localStorage.setItem("table", data.dbName);
      history.push(`/dashboard/${localStorage.getItem("id")}`);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="SignScreen signScreen">
      <Navbar/>
      <div className="SignRow row align-items-center">
        <div className="col-lg-8 SignImg text-center">
          <img src={img} alt="Sign In Img" />
        </div>
        <div className="col-lg-4">
          <form
           onSubmit={registerHandler}
           className="SignForm shadow-lg rounded"
          >
            <h2 className="register-screen__title">Register</h2>
            {error && <span className="error-message">{error}</span>}
            <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
              <div class="carousel-inner">
                <div class="carousel-item active">
                <div className="SignFRow form-group">
                    <div className="row align-items-center">
                      <div className="col-1 text-left">
                        <label htmlFor="name">
                          <i className="fas fa-signature fa-lg"></i>
                        </label>
                      </div>
                      <div className="col-11 textF">
                        <input
                          type="text"
                          required
                          id="name"
                          placeholder="Enter username"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="SignFRow form-group">
                    <div className="row align-items-center">
                      <div className="col-1 text-left">
                        <label htmlFor="email">
                          <i className="fas fa-envelope fa-lg"></i>
                        </label>
                      </div>
                      <div className="col-11 textF">
                        <input
                          type="email"
                          required
                          id="email"
                          placeholder="Email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="SignFRow form-group">
                    <div className="row align-items-center">
                      <div className="col-1 text-left">
                        <label htmlFor="password">
                          <i className="fas fa-key fa-lg"></i>
                        </label>
                      </div>
                      <div className="col-11 textF">
                        <input
                          type="password"
                          required
                          id="password"
                          autoComplete="true"
                          placeholder="Enter password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="SignFRow form-group">
                    <div className="row align-items-center">
                      <div className="col-1 text-left">
                        <label htmlFor="confirmpassword">
                          <i className="fas fa-check-circle fa-lg"></i>
                        </label>
                      </div>
                      <div className="col-11 textF">
                        <input
                          type="password"
                          required
                          id="confirmpassword"
                          autoComplete="true"
                          placeholder="Confirm password"
                          value={confirmpassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="carousel-item">
                <div className="SignFRow form-group">
                    <div className="row align-items-center">
                      <div className="col-1 text-left">
                        <label htmlFor="password">
                          <i class="fas fa-map-marked-alt fa-lg"></i>
                        </label>
                      </div>
                      <div className="col-11 textF">
                        <input
                          type="text"
                          required
                          id="address"
                          autoComplete="true"
                          placeholder="Enter Address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="SignFRow form-group">
                    <div className="row align-items-center">
                      <div className="col-1 text-left">
                        <label htmlFor="password">
                          <i class="fas fa-phone fa-lg"></i>
                        </label>
                      </div>
                      <div className="col-11 textF">
                        <input
                          type="tel"
                          required
                          id="phone"
                          autoComplete="true"
                          placeholder="Enter Phone No"
                          value={phNo}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
              
              
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary signInPtBtn"
                  style={{ marginTop: "2%",width:"60%" }}
                >
                  Submit
                </button>
                
                <div className="register">
                  Already have an account? <Link to="/login">Login</Link>
                </div>
              </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterUserScreen;