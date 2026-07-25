import { useState, useEffect } from "react";
import { getAllJobs } from "../api/job";
import { useNavigate } from "react-router-dom";

function Home() {
  const [search, setSearch] = useState({
    title: "",
    location: "",
  });

  const [jobs, setalljobs] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const alljob = async () => {
      try {
        const getalljob = await getAllJobs();
        setalljobs(getalljob);
      } catch (err) {
        console.log(err);
      }
    };
    alljob();
  }, []);

  const handleOnChange = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (search.title.trim() === "") {
      alert("Please enter title");
      return;
    }
    navigate(
      `/searchjob?title=${encodeURIComponent(search.title)}&location=${encodeURIComponent(search.location)}`,
    );
    setSearch({
      title: "",
      location: "",
    });
  };

  return (
    <div className="container mt-4">
      <div className="bg-primary bg-opacity-10 rounded-4 p-5 mb-4">
        <div className="row align-items-center">
          <div className="col-md-7">
            <h1 className="mb-2">Find Your Dream Job</h1>
            <p className="text-muted mb-4">
              Search from thousands of jobs and find the one that fits you
            </p>
            <div className="d-flex gap-2" style={{ maxWidth: "450px" }}>
              <input
                type="text"
                name="title"
                value={search.title}
                onChange={handleOnChange}
                className="form-control"
                placeholder="Job title, keywords..."
              />
              <input
                type="text"
                name="location"
                value={search.location}
                onChange={handleOnChange}
                className="form-control"
                placeholder="location..."
              />
              <button
                className="btn btn-primary px-4"
                onClick={() => handleSubmit(search)}
              >
                Search
              </button>
            </div>
          </div>
          <div className="col-md-5 text-center d-none d-md-block">
            <img
              src="https://media.istockphoto.com/id/1279104620/photo/top-view-of-a-white-desktop-concept-job-search.webp?a=1&b=1&s=612x612&w=0&k=20&c=qA4uxMHFDlueYMDF6_WyvBCa0hxbI3bdu4OKTIrVp1U="
              alt="Job search"
              className="img-fluid rounded-4"
              style={{ maxHeight: "260px", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>

      <h4 className="mb-4 fw-bold">Recent Jobs</h4>
      <div className="row">
        {jobs.map((job) => (
          <div className="col-md-4 mb-4" key={job._id}>
            <div className="card border-0 shadow-sm rounded-4 h-100 p-4">
              <h5 className="fw-bold">{job.title}</h5>

              <p className="text-secondary fw-semibold mb-4">
                {job.companyName}
              </p>

              <p className="mb-2">📍 {job.location}</p>

              <p className="mb-4">💰 {job.salary}</p>

              <button
                className="btn btn-outline-primary mt-auto rounded-pill"
                onClick={() => navigate(`/jobs/${job._id}`)}
              >
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
