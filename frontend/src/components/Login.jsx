import { useState } from "react";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

//save in store
import { useDispatch } from "react-redux";
import { userlogin } from "../../store/authSlice";

function Login() {
  const usedispatch = useDispatch();
  const navigate = useNavigate();

  const [loginFormData, setloginFormData] = useState({
    email: "",
    password: "",
  });

  const [error, seterror] = useState([]);

  const handlechange = (e) => {
    setloginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitData = async (e) => {
    e.preventDefault();
    try {
      const logindata = await loginUser(loginFormData);
      usedispatch(userlogin(logindata.user));
      alert("login sucessfully");
      navigate("/");
      setloginFormData({
        email: "",
        password: "",
      });
      seterror([]);
    } catch (err) {
      seterror(
        err.error ? [{ msg: err.error }] : [{ msg: "something went wrong" }],
      );
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Login</h3>

        <form onSubmit={handleSubmitData}>
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={loginFormData.email}
              onChange={handlechange}
              className="form-control"
              id="email"
              placeholder="Enter email"
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={loginFormData.password}
              onChange={handlechange}
              className="form-control"
              id="password"
              placeholder="Enter password"
            />
          </div>

          {error.length > 0 && (
            <div className="alert alert-danger">
              <ul className="mb-0">
                {error.map((err, idx) => (
                  <li key={idx}>{err.msg}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Button */}
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
