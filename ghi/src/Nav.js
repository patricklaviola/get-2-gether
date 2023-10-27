import useToken from "@galvanize-inc/jwtdown-for-react";
import { NavLink, useNavigate } from "react-router-dom";

function Nav() {
  const { logout } = useToken();
  const navigate = useNavigate();
  const { token } = useToken();

  function refreshPage() {
    navigate("/login");
  }

  if (token) {
    return (
      <>
        <div className="nav justify-content-end mt-3">
          <span className="d-flex">
            <div className="btn-toolbar" role="toolbar">
              <div className="btn-group mb-3" role="group">
                <button
                  className="btn btn-link"
                  onClick={async () => {
                    await logout();
                    refreshPage();
                  }}
                >
                  <NavLink
                    to="/login"
                    className="submit-login submit-container"
                  >
                    Logout
                    <i className="bi bi-box-arrow-left"></i>
                  </NavLink>
                </button>
                <button className="btn btn-link">
                  <NavLink
                    to={`/personal-dashboard`}
                    className="submit-login submit-container"
                  >
                    Personal Dashboard
                  </NavLink>
                </button>
              </div>
            </div>
          </span>
        </div>
      </>
    );
  }
}
export default Nav;
