import { useEffect } from "react";
import { useState } from "react";
import { getAllapplicants } from "../api/application";
import { useParams } from "react-router-dom";

function Applicant() {
  const { id } = useParams();
  const [applicants, setapplicants] = useState([]);

  useEffect(() => {
    const GetallApplicants = async (id) => {
      try {
        const allApplicants = await getAllapplicants(id);
        setapplicants(allApplicants);
      } catch (err) {
        console.log(err);
      }
    };
    GetallApplicants(id);
  }, [id]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Applicants</h2>

      {applicants.map((applicant) => (
        <div className="card mb-3 shadow-sm" key={applicant._id}>
          <div className="card-body">
            <h5>
              {applicant.appliedby.firstName} {applicant.appliedby.lastName}
            </h5>

            <p>
              <strong>Email:</strong> {applicant.appliedby.email}
            </p>

            {applicant.appliedby.resume ? (
              <a
                href={`http://localhost:1703/${applicant.appliedby.resume.replace(/\\/g, "/")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
              >
                View Resume
              </a>
            ) : (
              <span className="text-muted">Resume not uploaded</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Applicant;
