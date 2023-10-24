import useToken from "@galvanize-inc/jwtdown-for-react";
import { NavLink, useNavigate } from "react-router-dom";

const Nav = () => {
  const { logout } = useToken();
  const navigate = useNavigate();

  function refreshPage() {
    window.location.reload();
    navigate("/login");
  }

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
                <NavLink to="/login" className="submit-login submit-container">
                  Logout
                  <i className="bi bi-box-arrow-left"></i>
                </NavLink>
              </button>
            </div>
          </div>
        </span>
      </div>
    </>
  );
};

export default Nav;
