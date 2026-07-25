import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { getsearchJob } from "../api/search";
function SearchJob() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const title = searchParams.get("title");
  const location = searchParams.get("location");

  const [searchjob, setsearchjob] = useState([]);

  useEffect(() => {
    const searchedjob = async () => {
      try {
        const allsearchjob = await getsearchJob(title, location);
        setsearchjob(allsearchjob);
      } catch (err) {
        console.log(err);
      }
    };
    searchedjob();
  }, [title, location]);

  return (
    <div className="container mt-5">
      <h2 className="fw-bold mb-1">Search Results</h2>
      <p className="text-muted mb-4">{searchjob.length} Jobs Found</p>

      <div className="row">
        {searchjob.map((job) => (
          <div className="col-md-4 mb-4" key={job._id}>
            <div className="card shadow-sm border-0 rounded-4 h-100 p-4">
              <h5 className="fw-bold">{job.title}</h5>

              <p className="text-primary fw-semibold mb-3">{job.companyName}</p>

              <p className="mb-2">
                📍 <strong>Location:</strong> {job.location}
              </p>

              <p className="mb-2">
                💼 <strong>Job Type:</strong> {job.jobType}
              </p>

              <p className="mb-3">
                💰 <strong>Salary:</strong> {job.salary}
              </p>

              <hr />

              <p className="text-muted">
                {job.description.length > 90
                  ? job.description.slice(0, 90) + "..."
                  : job.description}
              </p>

              <button
                className="btn btn-primary rounded-pill mt-auto"
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

export default SearchJob;
