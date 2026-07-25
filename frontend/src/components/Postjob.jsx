import { createJob } from "../api/job";
import { useState } from "react";

function Postjob() {
  const [jobdetail, setjobdetail] = useState({
    title: "",
    companyName: "",
    description: "",
    location: "",
    salary: "",
    jobType: "",
    skilledRequired: "",
  });

  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    setjobdetail({
      ...jobdetail,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await createJob(jobdetail);
      alert("job post sucessfully");
      setjobdetail({
        title: "",
        companyName: "",
        description: "",
        location: "",
        salary: "",
        jobType: "",
        skilledRequired: "",
      });
      setErrors([]);
    } catch (err) {
      console.log("error in postjob component", err);
      setErrors(
        err.msg ? [{ msg: err.msg }] : [{ msg: "Something went wrong" }],
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-4 text-center">Post a New Job</h2>

        <form onSubmit={handleSubmit}>
          {/* Job Title */}
          <div className="mb-3">
            <label className="form-label">Job Title</label>
            <input
              name="title"
              onChange={handleChange}
              value={jobdetail.title}
              type="text"
              className="form-control"
              placeholder="e.g. Frontend Developer"
            />
          </div>

          {/* Company Name */}
          <div className="mb-3">
            <label className="form-label">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={jobdetail.companyName}
              onChange={handleChange}
              className="form-control"
              placeholder="e.g. Google"
            />
          </div>

          {/* Job Description */}
          <div className="mb-3">
            <label className="form-label">Job Description</label>
            <textarea
              className="form-control"
              value={jobdetail.description}
              name="description"
              onChange={handleChange}
              rows="5"
              placeholder="Describe the job..."
            ></textarea>
          </div>

          <div className="row">
            {/* Location */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Location</label>
              <input
                type="text"
                value={jobdetail.location}
                name="location"
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. Bangalore"
              />
            </div>

            {/* Salary */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Salary</label>
              <input
                type="text"
                name="salary"
                value={jobdetail.salary}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. ₹6 LPA"
              />
            </div>
          </div>

          <div className="row">
            {/* Job Type */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Job Type</label>
              <select
                className="form-select"
                name="jobType"
                onChange={handleChange}
                value={jobdetail.jobType}
              >
                <option value="">Select Job Type</option>
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Internship</option>
                <option>Contract</option>
                <option>Remote</option>
              </select>
            </div>

            {/* Skills Required */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Skills Required</label>
              <input
                type="text"
                name="skilledRequired"
                value={jobdetail.skilledRequired}
                onChange={handleChange}
                className="form-control"
                placeholder="React, Node.js, MongoDB"
              />
            </div>
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

          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary px-5">
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Postjob;
