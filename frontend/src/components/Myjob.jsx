import { useEffect, useState } from "react";
import { deleteJobById, editpost, getMyJobs } from "../api/job";
import { Navigate, useNavigate } from "react-router-dom";

function MyJobs() {
  const navigate = useNavigate();
  const [jobs, setjobs] = useState([]);

  useEffect(() => {
    const getmyjob = async () => {
      try {
        const getalljob = await getMyJobs();
        setjobs(getalljob);
      } catch (err) {
        console.log(err);
      }
    };
    getmyjob();
  }, []);

  const handledelete = async (id) => {
    try {
      const deletejob = await deleteJobById(id);
      setjobs(jobs.filter((job) => job._id !== id));
    } catch (err) {
      console.log(err);
      alert("failed to delete post");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Jobs</h2>

      {jobs.map((job) => (
        <div className="card mb-3 p-3" key={job._id}>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5>{job.title}</h5>
              <p className="text-muted mb-1">{job.location}</p>
              <p className="mb-1">{job.salary}</p>
              <small className="text-muted">Posted on {job.postedOn}</small>
            </div>

            <div className="text-end">
              <p className="mb-2">{job.applicationsCount} Applications</p>
              <button
                className="btn btn-outline-primary btn-sm me-2"
                onClick={() => navigate(`/recruiter/updatepost/${job._id}`)}
              >
                Edit
              </button>
              <button
                className="btn btn-outline-danger btn-sm me-2"
                onClick={() => handledelete(job._id)}
              >
                Delete
              </button>
              <button
                className="btn btn-outline-info btn-sm me-2"
                onClick={() => navigate(`/recruiter/job/${job._id}/applicants`)}
              >
                View Applicants
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyJobs;
