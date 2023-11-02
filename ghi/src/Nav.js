import useToken from "@galvanize-inc/jwtdown-for-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Nav() {
  const { logout } = useToken();
  const navigate = useNavigate();
  const { token } = useToken();

  useEffect(() => {
    if (!token) {
      navigate(`/login`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (token) {
    return (
      <>
        <div className="nav dashboardNav position-absolute top-0 end-0">
          <span className="d-flex">
            <div className="btn-toolbar" role="toolbar">
              <div className="btn-group mb-3" role="group">
                <button
                  className="btn"
                  onClick={async () => {
                    await logout();
                    navigate("/login");
                  }}
                >
                  <NavLink
                    to="/login"
                    className="buttons-styling"
                    id="navDesign-buttons"
                  >
                    Logout
                  </NavLink>
                </button>
                <button className="btn" id="navDesign-buttons">
                  <NavLink
                    to={`/personal-dashboard`}
                    className="buttons-styling"
                  >
                    Personal Dashboard
                  </NavLink>
                </button>
                <button className="btn" id="navDesign-buttons">
                  <NavLink to={`/chat`} className="buttons-styling">
                    Chat
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
