import React from "react";
import "./Style.css";
import { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUpForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useToken();
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
    const accountData = {
      username: email,
      user_name: username,
      email: email,
      password: password,
    };
    await register(
      accountData,
      `${process.env.REACT_APP_API_HOST}/api/accounts`
    );
    e.target.reset();
    setTimeout(() => {
      navigate("/personal-dashboard");
    }, 900);
  };

  return (
    <div className="input-container">
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={(e) => handleRegistration(e)}>
        <div className="inputs">
          <div className="input">
            <svg
              className="icon"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path
                fill="#97feed"
                d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"
              />
            </svg>
            <input
              type="text"
              placeholder="Username"
              name="name"
              className="form-control"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="input">
            <svg
              className="icon"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path
                fill="#97feed"
                d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"
              />
            </svg>
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="form-control"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="input">
            <svg
              className="icon"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path
                fill="#97feed"
                d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"
              />
            </svg>
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="form-control"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="submit-container">
          <Link to="/login">
            <button id="login-button" className="btn btn-primary submit">
              Login
            </button>
          </Link>
          <input className="btn submit" type="submit" value="Sign Up" />
        </div>
      </form>
    </div>
  );
}
