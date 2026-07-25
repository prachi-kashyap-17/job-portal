import { Link } from "react-router-dom";
import { logoutUser } from "../api/auth";
import { useSelector, useDispatch } from "react-redux";
import { userlogout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const { isLoggedIn, user } = useSelector((store) => store.auth);
  const usedispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      usedispatch(userlogout());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top px-4 py-3">
      <div className="container-fluid">
        <span className="navbar-brand fw-bold text-primary fs-4">
          JOB PORTAL
        </span>

        <div className="d-flex align-items-center gap-4 mx-auto">
          <Link to="/" className="text-decoration-none text-dark fw-medium">
            HOME
          </Link>
          <Link to="/jobs" className="text-decoration-none text-dark fw-medium">
            JOBS
          </Link>

          {isLoggedIn && user.role === "candidate" && (
            <>
              <Link
                to="/Myapplication"
                className="text-decoration-none text-dark fw-medium"
              >
                MY APPLICATIONS
              </Link>
              <Link
                to="/savejob"
                className="text-decoration-none text-dark fw-medium"
              >
                SAVED JOB
              </Link>
            </>
          )}

          {isLoggedIn && user.role === "recruiter" && (
            <>
              <Link
                to="/recruiter/dashboard"
                className="text-decoration-none text-dark fw-medium"
              >
                DASHBOARD
              </Link>
              <Link
                to="/recruiter/myjobs"
                className="text-decoration-none text-dark fw-medium"
              >
                MY JOBS
              </Link>
            </>
          )}
        </div>

        <div className="d-flex align-items-center gap-3">
          {!isLoggedIn && (
            <>
              <Link to="/login" className="btn btn-outline-primary btn-sm">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Register
              </Link>
            </>
          )}

          {isLoggedIn && (
            <>
              <Link to="/profile" className="btn btn-primary btn-sm">
                Profile
              </Link>
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={async () => {
                  await handleLogout();
                  navigate("/login");
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
