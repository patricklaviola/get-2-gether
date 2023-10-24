import useToken from "@galvanize-inc/jwtdown-for-react";
import { NavLink, useNavigate } from "react-router-dom";

const Nav = () => {
  const { logout } = useToken();
  const navigate = useNavigate();
  const handleClick = () => navigate("/signup");

  function refreshPage() {
    window.location.reload();
    navigate("/login");
  }

  return (
    <div className="mt-3">
      <span className="d-flex">
        <div className="btn-toolbar" role="toolbar">
          <div className="btn-group mb-3" role="group">
            <button className="btn btn-link">
              <NavLink to="/login">Login</NavLink>
            </button>

            <button
              className="btn btn-link"
              onClick={async () => {
                await logout();
                refreshPage();
              }}
            >
              <NavLink to="/login">Logout</NavLink>
            </button>

            <button
              type="button"
              className="btn"
              onClick={handleClick}
            >
              Sign Up <i className="bi bi-person-plus"></i>
            </button>

            <button className="btn btn-link">
              <NavLink to="/groups">
                Create New Group
              </NavLink>
              <i className="bi bi-plus"></i>
            </button>
          </div>
        </div>
      </span>
    </div>
  );
};

export default Nav;
