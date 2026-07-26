import { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, seterrors] = useState([]);

  const handleChange = (e) => {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (formdata.password !== formdata.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const data = await registerUser(formdata);
      console.log("success:", data);
      alert(
        "Register succesfully! please login with same email and password, press ok to continue",
      );
      navigate("/login");
      seterrors([]);
      setformdata({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
      });
    } catch (err) {
      console.log("ERROR:", err);
      seterrors(err.errors || [{ msg: "something went wrong" }]);
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center vh-100"
      style={{ marginTop: "70px" }}
    >
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Register</h3>

        <form onSubmit={handlesubmit}>
          {/* First Name */}
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formdata.firstName}
              onChange={handleChange}
              className="form-control"
              id="firstName"
              placeholder="Enter first name"
            />
          </div>

          {/* Last Name */}
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formdata.lastName}
              onChange={handleChange}
              className="form-control"
              id="lastName"
              placeholder="Enter last name"
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              value={formdata.email}
              name="email"
              onChange={handleChange}
              className="form-control"
              id="email"
              placeholder="Enter email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Register as</label>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="role"
                id="candidate"
                checked={formdata.role === "candidate"}
                value="candidate"
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="candidate">
                Candidate
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="role"
                checked={formdata.role === "recruiter"}
                id="recruiter"
                value="recruiter"
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="recruiter">
                Recruiter
              </label>
            </div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formdata.password}
              onChange={handleChange}
              className="form-control"
              id="password"
              placeholder="Enter password"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              value={formdata.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm password"
            />
          </div>

          {errors.length > 0 && (
            <div className="alert alert-danger">
              <ul className="mb-0">
                {errors.map((err, idx) => (
                  <li key={idx}>{err.msg}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Button */}
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

//what if we dont use value in the input? => The input still works, but it is controlled by the browser, not React. So React has less control over the input
// why use value in the input? => We use value to make the input controlled by React. The input always shows the value stored in the state

//useState => "I use useState because I want React to store the data and update the UI."
//useRef => "I use useRef when I only need the value on submit and I don't need the UI to update while typing."

//Fetch and Axios are both used to send HTTP requests between the frontend and backend. Fetch is built into JavaScript, while Axios is an external library with a simpler API and some extra features
