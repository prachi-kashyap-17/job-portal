// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { getMyJobs } from "../api/job";

// function Dashboard() {
//   const [totaljob, settotaljob] = useState();

//   useEffect(() => {
//     const getmyjob = async () => {
//       try {
//         const getmyjobs = await getMyJobs();
//         settotaljob(getmyjobs.length);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getmyjob();
//   }, []);

//   return (
//     <div className="container mt-4">
//       <h2>Welcome back, Recruiter!</h2>
//       <p className="text-muted">
//         Manage your jobs and find the best candidates.
//       </p>

//       <div className="d-flex gap-3 mb-4">
//         <div className="card p-3" style={{ width: "200px" }}>
//           <h6>Total Jobs Posted</h6>
//           <h3>{totaljob}</h3>
//         </div>
//         <div className="card p-3" style={{ width: "200px" }}>
//           <h6>Total Applications</h6>
//           <h3>0</h3>
//         </div>
//         <div className="card p-3" style={{ width: "200px" }}>
//           <h6>Active Jobs</h6>
//           <h3>0</h3>
//         </div>
//       </div>

//       <div className="d-flex gap-3 mb-4">
//         <Link to="/recruiter/postjob" className="btn btn-primary">
//           + Post New Job
//         </Link>
//         <button className="btn btn-outline-primary">View My Jobs</button>
//       </div>

//       <div>
//         <h5>Recent Jobs</h5>
//         <p className="text-muted">No jobs posted yet.</p>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyJobs } from "../api/job";

function Dashboard() {
  const [totaljob, settotaljob] = useState(0);
  const [jobs, setjobs] = useState([]);

  useEffect(() => {
    const getmyjob = async () => {
      try {
        const getmyjobs = await getMyJobs();
        settotaljob(getmyjobs.length);
        setjobs(getmyjobs);
      } catch (err) {
        console.log(err);
      }
    };
    getmyjob();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Welcome back, Recruiter!</h2>
      <p className="text-muted">
        Manage your jobs and find the best candidates.
      </p>

      <div className="d-flex gap-3 mb-4">
        <div className="card p-3" style={{ width: "200px" }}>
          <h6>Total Jobs Posted</h6>
          <h3>{totaljob}</h3>
        </div>
        <div className="card p-3" style={{ width: "200px" }}>
          <h6>Job Types</h6>
          <h3>{new Set(jobs.map((job) => job.jobType)).size}</h3>
        </div>
        <div className="card p-3" style={{ width: "200px" }}>
          <h6>Locations</h6>
          <h3>{new Set(jobs.map((job) => job.location)).size}</h3>
        </div>
      </div>

      <div className="d-flex gap-3 mb-4">
        <Link to="/recruiter/postjob" className="btn btn-primary">
          + Post New Job
        </Link>
        <Link to="/recruiter/myjobs" className="btn btn-outline-primary">
          View My Jobs
        </Link>
      </div>

      <div>
        <h5>Recent Jobs</h5>
        {jobs.length === 0 ? (
          <p className="text-muted">No jobs posted yet.</p>
        ) : (
          jobs.slice(0, 3).map((job) => (
            <div className="card mb-2 p-3" key={job._id}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-1">{job.title}</h6>
                  <small className="text-muted">
                    {job.location} · {job.salary}
                  </small>
                </div>
                <Link
                  to={`/jobs/${job._id}`}
                  className="btn btn-outline-secondary btn-sm"
                >
                  View
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
