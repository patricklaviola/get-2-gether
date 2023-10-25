import useToken from "@galvanize-inc/jwtdown-for-react";
import { NavLink, useNavigate } from "react-router-dom";

function Nav(props) {
  const { logout } = useToken();
  const navigate = useNavigate();
  // const [token, setToken] = useState({});

  // const fetchData = async () => {
  //   const url = `${process.env.REACT_APP_API_HOST}/token`;

  //   const response = await fetch(url, { credentials: "include" });
  //   if (response.ok) {
  //     const data = await response.json();
  //     console.log(data["account"]);
  //     setToken(data["account"]);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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
              <button
                className="btn btn-link"
                onClick={async () => {
                  refreshPage();
                }}
              >
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

export default Nav;
