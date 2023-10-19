import { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import {useNavigate} from "react-router-dom";

function SignUpForm() {
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
    navigate("/")
  };

  return (
    <div className="card text-bg-light mb-3">
      <h5 className="card-header">Sign Up</h5>
      <div className="card-body">
        <form onSubmit={(e) => handleRegistration(e)}>
          <div className="mb-3">
            <label className="form-label">Name </label>
            <input
              name="name"
              type="text"
              className="form-control"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div>
            <div className="mb-3">
              <label className="form-label">Email </label>
              <input
                name="email"
                type="email"
                className="form-control"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password </label>
              <input
                name="password"
                type="password"
                className="form-control"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <input className="btn btn-primary" type="submit" value="Register" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
