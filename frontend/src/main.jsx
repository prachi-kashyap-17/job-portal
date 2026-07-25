import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App.jsx";

//path change
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//store connect to app
import { Provider } from "react-redux";
import store from "../store/index";

//components
import Home from "./components/home.jsx";
import Job from "./components/Job.jsx";
import Myapplication from "./components/Myapplication.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Postjob from "./components/Postjob.jsx";
import JobDetail from "./components/jobDetail.jsx";
import MyJobs from "./components/Myjob.jsx";
import EditPost from "./components/EditPost.jsx";
import SavedJob from "./components/SavedJob.jsx";
import Applicant from "./components/Applicant.jsx";
import SearchJob from "./components/SearchJob.jsx";
import Profile from "./components/Profile.jsx";
import EditProfile from "./components/Editprofile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/jobs", element: <Job /> },
      { path: "/jobs/:id", element: <JobDetail /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/searchjob", element: <SearchJob /> },

      {
        path: "/savejob",
        element: (
          <ProtectedRoute allowedrole="candidate">
            <SavedJob />
          </ProtectedRoute>
        ),
      },
      {
        path: "/Myapplication",
        element: (
          <ProtectedRoute allowedrole="candidate">
            <Myapplication />
          </ProtectedRoute>
        ),
      },
      {
        path: "/recruiter/dashboard",
        element: (
          <ProtectedRoute allowedrole="recruiter">
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/recruiter/postjob",
        element: (
          <ProtectedRoute allowedrole="recruiter">
            <Postjob />
          </ProtectedRoute>
        ),
      },
      {
        path: "/recruiter/myjobs",
        element: (
          <ProtectedRoute allowedrole="recruiter">
            <MyJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/recruiter/updatepost/:id",
        element: (
          <ProtectedRoute allowedrole="recruiter">
            <EditPost />
          </ProtectedRoute>
        ),
      },
      {
        path: "/recruiter/job/:id/applicants",
        element: (
          <ProtectedRoute allowedrole="recruiter">
            <Applicant />
          </ProtectedRoute>
        ),
      },

      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/editprofile",
        element: (
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
