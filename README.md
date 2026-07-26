# Job Portal

A full-stack job portal web application built with the MERN stack (MongoDB, Express, React, Node.js) where candidates can search and apply for jobs, and recruiters can post and manage job listings.

**Live Demo:** [job-portal-prachi-3049.vercel.app](https://job-portal-prachi-3049.vercel.app)

## Features

### For Candidates

- Register/Login with secure authentication
- Browse and search jobs by title and location
- View detailed job descriptions
- Apply to jobs and track application status
- Save jobs for later
- Edit personal profile and upload resume (PDF)

### For Recruiters

- Post new job listings
- View, edit, and delete their posted jobs
- View list of applicants for each job posting

### General

- Role-based access control (candidate vs recruiter)
- Session-based authentication with MongoDB session store
- Protected routes on the frontend based on login status and role

## Tech Stack

**Frontend:**

- React (with React Router for navigation)
- Redux Toolkit (state management)
- Bootstrap (styling)
- Vite (build tool)

**Backend:**

- Node.js + Express
- MongoDB with Mongoose
- express-session + connect-mongodb-session (session storage)
- bcrypt (password hashing)
- express-validator (input validation)
- Multer (resume file uploads)

**Deployment:**

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## Project Structure

```
job-portal/
├── backend/
│ ├── controllers/ # Route handler logic
│ ├── models/ # Mongoose schemas (User, Job, Application)
│ ├── routes/ # API route definitions
│ ├── uploads/ # Uploaded resume files
│ └── app.js # Entry point
├── frontend/
│ ├── src/
│ │ ├── api/ # API call functions (fetch wrappers)
│ │ ├── components/ # React components/pages
│ │ ├── App.jsx
│ │ └── main.jsx # Routes and app entry
│ └── store/ # Redux store and slices
```

## Getting Started (Local Setup)

### Prerequisites

- Node.js installed
- A MongoDB Atlas account (or local MongoDB instance)

### Backend Setup

\`\`\`bash
cd backend
npm install
\`\`\`

Create a `.env` file inside `backend/` with:
\`\`\`
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
\`\`\`

Run the backend:
\`\`\`bash
npm start
\`\`\`

### Frontend Setup

\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

## API Overview

| Method | Endpoint                        | Description                                |
| ------ | ------------------------------- | ------------------------------------------ |
| POST   | `/register`                     | Register a new user                        |
| POST   | `/login`                        | Log in a user                              |
| POST   | `/logout`                       | Log out the current user                   |
| GET    | `/profile`                      | Get logged-in user's profile               |
| PUT    | `/updateprofile`                | Update profile details                     |
| GET    | `/jobs`                         | Get all job listings                       |
| GET    | `/jobs/:id`                     | Get a single job by ID                     |
| GET    | `/searchjob`                    | Search jobs by title/location              |
| POST   | `/recruiter/postjob`            | Create a new job posting                   |
| GET    | `/recruiter/myjobs`             | Get jobs posted by the logged-in recruiter |
| PUT    | `/recruiter/updatepost/:id`     | Update a job posting                       |
| DELETE | `/recruiter/deletepost/:id`     | Delete a job posting                       |
| POST   | `/apply/:id`                    | Apply to a job                             |
| GET    | `/Myapplication`                | Get applications submitted by the user     |
| POST   | `/savejob/:id`                  | Save a job                                 |
| GET    | `/savejob`                      | Get saved jobs                             |
| POST   | `/unsaveJob/:id`                | Remove a saved job                         |
| GET    | `/recruiter/job/:id/applicants` | Get applicants for a job                   |

## What I Learned

Building and deploying this project involved solving several real-world challenges:

- Setting up session-based authentication that works across separate frontend/backend domains
- Handling CORS between a Vercel-hosted frontend and a Render-hosted backend
- Configuring secure, cross-site cookies (`sameSite: none`, `secure: true`, `trust proxy`)
- Managing environment variables and keeping database credentials out of version control
- Debugging case-sensitivity issues between Windows (local) and Linux (production) environments

## Future Improvements

- Add authorization checks so recruiters can only edit/delete their own job postings
- Add pagination for job listings
- Add email notifications for application status updates
- Add unit and integration tests

## Author

Prachi Kashyap
