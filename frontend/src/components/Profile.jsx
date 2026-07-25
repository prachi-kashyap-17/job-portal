import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../api/auth";

function Profile() {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  // Dummy data abhi ke liye — backend connect hone ke baad useEffect se aayega
  const [profileData, setProfileData] = useState({
    phone: "",
    location: "",
    about: "",
    skills: "",
    companyName: "",
    companyDescription: "",
    website: "",
  });

  useEffect(() => {
    const getProfiledetail = async () => {
      try {
        const profiledetail = await getProfile();
        setProfileData(profiledetail);
      } catch (err) {
        console.log(err);
      }
    };
    getProfiledetail();
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Left sidebar */}
        <div className="col-md-4 mb-4">
          <div className="card p-4 text-center">
            <div
              className="rounded-circle bg-primary bg-opacity-25 text-primary d-flex align-items-center justify-content-center mx-auto mb-3"
              style={{
                width: "90px",
                height: "90px",
                fontSize: "28px",
                fontWeight: "600",
              }}
            >
              {user.firstName?.[0]}
              {user.lastName?.[0]}
            </div>
            <h5 className="mb-1">
              {user.firstName} {user.lastName}
            </h5>
            <p className="text-muted small mb-1 text-capitalize">{user.role}</p>
            <p className="text-muted small mb-3">
              {profileData.location || "Data not available"}
            </p>
            <button
              className="btn btn-primary w-100"
              onClick={() => navigate("/editprofile")}
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Right content */}
        <div className="col-md-8">
          <div className="card p-4 mb-3">
            <h6 className="mb-3">Contact</h6>
            <p className="mb-2">📧 {user.email}</p>
            <p className="mb-0">
              📞 {profileData.phone || "Data not available"}
            </p>
          </div>

          {user.role === "candidate" && (
            <>
              <div className="card p-4 mb-3">
                <h6 className="mb-2">About</h6>
                <p className="text-muted mb-0">
                  {profileData.about || "Data not available"}
                </p>
              </div>

              <div className="card p-4 mb-3">
                <h6 className="mb-3">Skills</h6>
                {profileData.skills ? (
                  <div className="d-flex flex-wrap gap-2">
                    {profileData.skills.split(",").map((skill, idx) => (
                      <span
                        key={idx}
                        className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-2"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted mb-0">Data not available</p>
                )}
              </div>

              <div className="card p-4 d-flex flex-row justify-content-between align-items-center">
                <p className="mb-0 fw-medium">📄 Resume</p>
                {profileData.resume ? (
                  <a
                    href={`http://localhost:1703/${profileData.resume}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary btn-sm"
                  >
                    View Resume
                  </a>
                ) : (
                  <span className="text-muted small">Not uploaded</span>
                )}
              </div>
            </>
          )}

          {user.role === "recruiter" && (
            <>
              <div className="card p-4 mb-3">
                <h6 className="mb-2">Company Name</h6>
                <p className="text-muted mb-0">
                  {profileData.companyName || "Data not available"}
                </p>
              </div>

              <div className="card p-4 mb-3">
                <h6 className="mb-2">About Company</h6>
                <p className="text-muted mb-0">
                  {profileData.companyDescription || "Data not available"}
                </p>
              </div>

              <div className="card p-4">
                <h6 className="mb-2">Website</h6>
                <p className="text-muted mb-0">
                  {profileData.website || "Data not available"}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
