import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleJob } from "../api/job";
import { ApplyOnJob, saved } from "../api/application";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function JobDetail() {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((store) => store.auth);
  const { id } = useParams();
  const [job, setjob] = useState({});
  useEffect(() => {
    const mainJob = async () => {
      try {
        const job = await getSingleJob(id);
        setjob(job);
      } catch (err) {}
    };
    mainJob();
  }, [id]);

  const handleApply = async (id) => {
    try {
      const applyOn = await ApplyOnJob(id);
      alert(applyOn.msg);
    } catch (err) {
      console.log(err);
      alert("Failed to apply. Please try again.");
    }
  };

  const handleSaved = async (id) => {
    try {
      const savedjob = await saved(id);
      alert("job saved sucessfully");
      navigate("/savejob");
    } catch (err) {
      console.log(err);
      alert("failed to save job");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2>{job.title}</h2>
        <h5 className="text-muted mb-3">{job.companyName}</h5>

        <p>
          <strong>📍 Location:</strong> {job.location}
        </p>
        <p>
          <strong>💰 Salary:</strong> {job.salary}
        </p>
        <p>
          <strong>💼 Job Type:</strong> {job.jobType}
        </p>

        <hr />

        <h5>Job Description</h5>
        <p>{job.description}</p>

        <h5>Skills Required</h5>
        <p>{job.skilledRequired}</p>
        {isLoggedIn && user.role === "candidate" && (
          <div className="mt-4">
            <button
              className="btn btn-primary me-3"
              onClick={() => handleApply(id)}
            >
              Apply Now
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={() => handleSaved(id)}
            >
              Save Job
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobDetail;
