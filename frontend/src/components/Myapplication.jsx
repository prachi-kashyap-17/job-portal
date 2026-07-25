import { useEffect, useState } from "react";
import { MyApplications } from "../api/application";
import { useNavigate } from "react-router-dom";

function MyApplication() {
  const navigate = useNavigate();
  const [applications, setapplication] = useState([]);

  useEffect(() => {
    const myAllApplications = async () => {
      try {
        const myapplication = await MyApplications();
        setapplication(myapplication);
      } catch (err) {
        console.log(err);
      }
    };
    myAllApplications();
  }, []);

  const getBadgeClass = (status) => {
    if (status === "applied") return "bg-primary";
    if (status === "shortlisted") return "bg-success";
    if (status === "rejected") return "bg-danger";
    return "bg-secondary";
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Applications</h2>

      {applications
        .filter((job) => job.applyOn)
        .map((app) => (
          <div className="card mb-3 p-3" key={app._id}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5>{app.applyOn.title}</h5>
                <p className="text-muted mb-1">{app.applyOn.companyName}</p>
                <small className="text-muted">Applied on {app.appliedOn}</small>
              </div>
              <div className="d-flex align-items-center gap-3">
                <span className={`badge ${getBadgeClass(app.status)}`}>
                  {app.status}
                </span>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => navigate(`/jobs/${app.applyOn._id}`)}
                >
                  View Job
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default MyApplication;
