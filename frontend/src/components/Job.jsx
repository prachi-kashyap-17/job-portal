import { getAllJobs } from "../api/job";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Job() {
  const navigate = useNavigate();
  const [jobs, setjobs] = useState([]);
  const [err, seterr] = useState([]);

  useEffect(() => {
    const joblist = async () => {
      try {
        const joblist = await getAllJobs();
        setjobs(joblist);
      } catch (err) {
        seterr(
          err.error ? [{ msg: err.error }] : [{ msg: "something went wrong" }],
        );
      }
    };
    joblist();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Available Jobs</h2>

      <div className="row">
        {jobs.map((job) => (
          <div className="col-md-6 col-lg-4 mb-4" key={job._id}>
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex flex-column">
                <h4 className="card-title">{job.title}</h4>
                <h6 className="text-muted mb-3">{job.companyName}</h6>

                <p>
                  <strong>📍 Location:</strong> {job.location}
                </p>

                <p>
                  <strong>💰 Salary:</strong> {job.salary}
                </p>

                <p>
                  <strong>💼 Job Type:</strong> {job.jobType}
                </p>

                <p>
                  <strong>🛠 Skills:</strong> {job.skilledRequired}
                </p>

                <button
                  className="btn btn-primary mt-auto"
                  onClick={() => navigate(`/jobs/${job._id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Job;
