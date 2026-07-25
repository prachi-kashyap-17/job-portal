import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { editpost, getSingleJob } from "../api/job";
import { useNavigate } from "react-router-dom";

function EditPost() {
  const navigate = useNavigate();
  const [oldpostdata, setoldpostdata] = useState({
    title: "",
    companyName: "",
    description: "",
    location: "",
    salary: "",
    jobType: "",
    skilledRequired: "",
  });

  const { id } = useParams();

  useEffect(() => {
    const getpostbyid = async () => {
      try {
        const editpost = await getSingleJob(id);
        setoldpostdata(editpost);
      } catch (err) {
        console.log(err);
      }
    };
    getpostbyid();
  }, [id]);

  const handleChange = (e) => {
    setoldpostdata({ ...oldpostdata, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const updatepost = await editpost(id, oldpostdata);
      alert("Job updated successfully");
      navigate("/recruiter/myjobs");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-4 text-center">Edit Job</h2>

        <form onSubmit={handlesubmit}>
          {/* Job Title */}
          <div className="mb-3">
            <label className="form-label">Job Title</label>
            <input
              name="title"
              onChange={handleChange}
              value={oldpostdata.title}
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
              value={oldpostdata.companyName}
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
              value={oldpostdata.description}
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
                value={oldpostdata.location}
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
                value={oldpostdata.salary}
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
                value={oldpostdata.jobType}
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
                value={oldpostdata.skilledRequired}
                onChange={handleChange}
                className="form-control"
                placeholder="React, Node.js, MongoDB"
              />
            </div>
          </div>

          {/* {errors.length > 0 && (
            <div className="alert alert-danger">
              <ul className="mb-0">
                {errors.map((err, idx) => (
                  <li key={idx}>{err.msg}</li>
                ))}
              </ul>
            </div>
          )} */}

          <div className="text-center mt-4">
            <button type="submit" className="btn btn-success px-5">
              Update Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default EditPost;
