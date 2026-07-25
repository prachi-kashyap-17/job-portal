import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProfile, updateprofile } from "../api/auth";

function EditProfile() {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [resume, setresume] = useState();
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
    const getOldData = async () => {
      try {
        const getolddata = await getProfile();
        setProfileData(getolddata);
      } catch (err) {
        console.log(err);
        alert("failed to update profile");
      }
    };
    getOldData();
  }, []);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("phone", profileData.phone);
      formDataToSend.append("location", profileData.location);
      formDataToSend.append("about", profileData.about);
      formDataToSend.append("skills", profileData.skills);
      formDataToSend.append("companyName", profileData.companyName);
      formDataToSend.append(
        "companyDescription",
        profileData.companyDescription,
      );
      formDataToSend.append("website", profileData.website);

      if (resume) {
        formDataToSend.append("resume", resume);
      }
      const update = await updateprofile(formDataToSend);
      alert("Profile updated successfully");
      navigate("/profile");
    } catch (err) {
      console.log(err);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card p-4">
        <h4 className="mb-4">Edit Profile</h4>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              name="phone"
              value={profileData.phone}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter phone number"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Location</label>
            <input
              type="text"
              name="location"
              value={profileData.location}
              onChange={handleChange}
              className="form-control"
              placeholder="City, Country"
            />
          </div>

          {user.role === "candidate" && (
            <>
              <div className="mb-3">
                <label className="form-label">About</label>
                <textarea
                  name="about"
                  value={profileData.about}
                  onChange={handleChange}
                  className="form-control"
                  rows="4"
                  placeholder="Tell us about yourself"
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">Skills (comma separated)</label>
                <input
                  type="text"
                  name="skills"
                  value={profileData.skills}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="React, Node.js, MongoDB"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Upload your resume here</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setresume(e.target.files[0])}
                  className="form-control"
                />
              </div>
            </>
          )}

          {user.role === "recruiter" && (
            <>
              <div className="mb-3">
                <label className="form-label">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={profileData.companyName}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g. Tech Solutions"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Company Description</label>
                <textarea
                  name="companyDescription"
                  value={profileData.companyDescription}
                  onChange={handleChange}
                  className="form-control"
                  rows="4"
                  placeholder="Describe your company"
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">Website</label>
                <input
                  type="text"
                  name="website"
                  value={profileData.website}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="https://example.com"
                />
              </div>
            </>
          )}

          <div className="d-flex gap-2 mt-4">
            <button type="submit" className="btn btn-primary px-4">
              Save Changes
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary px-4"
              onClick={() => navigate("/profile")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
