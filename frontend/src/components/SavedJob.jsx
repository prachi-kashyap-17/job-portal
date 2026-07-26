import { useEffect, useState } from "react";
import { getsavedjob, Unsave } from "../api/application";
import { useNavigate } from "react-router-dom";

function SavedJob() {
  const [savedjobs, setsavedjobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedjob = async () => {
      try {
        const savedjob = await getsavedjob();
        setsavedjobs(savedjob);
      } catch (err) {
        console.log(err);
      }
    };
    savedjob();
  }, []);

  const handleUnsave = async (id) => {
    try {
      const unsave = await Unsave(id);
      setsavedjobs(savedjobs.filter((job) => job._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Saved Jobs</h2>

      {savedjobs
        .filter((job) => job.applyOn)
        .map((job) => (
          <div className="card mb-3 p-3" key={job._id}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5>{job.applyOn.title}</h5>
                <p className="text-muted mb-1">
                  {job.applyOn.companyName} · {job.applyOn.location}
                </p>
                <small className="text-muted">{job.applyOn.salary}</small>
              </div>
              <div>
                <button
                  className="btn btn-outline-primary btn-sm me-2"
                  onClick={() => navigate(`/jobs/${job.applyOn._id}`)}
                >
                  View Job
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleUnsave(job._id)}
                >
                  Unsave
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default SavedJob;
