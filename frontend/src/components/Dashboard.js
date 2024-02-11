import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Dashboard.css";
import JobDetailsCard from "./JobDetailsCard.js";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isJobDetailsOpen, setIsJobDetailsOpen] = useState(false); // New state
  const jobsPerPage = 15;
  const jobListingRef = useRef(null);
  const jobDetailRef = useRef(null);

  useEffect(() => {
    // Fetch jobs from the server when the component mounts
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(
        "https://securenet-backend.vercel.app/applyJobs"
      );
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:123   ", error);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    setSelectedJob(null); // Reset selected job when changing the page
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
    setSelectedJob(null); // Reset selected job when changing the page
  };

  const handleJobClick = (jobId) => {
    if (!isJobDetailsOpen) {
      setSelectedJob(jobId);
      setIsJobDetailsOpen(true);
    }
  };

  const handleDocumentClick = (event) => {
    if (
      jobListingRef.current &&
      jobDetailRef.current &&
      !jobListingRef.current.contains(event.target) &&
      !jobDetailRef.current.contains(event.target)
    ) {
      // Clicked outside the job listing container and job detail card
      setSelectedJob(null);
      setIsJobDetailsOpen(false);
    }
  };
  

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div className="Dashboard-body">
      <h2>Job Listings</h2>
      <div
        ref={jobListingRef}
        className={`job-listing-container ${isJobDetailsOpen ? "zoomed" : ""}`}
      >
        <div className="job-grid">
          {jobs.map((job) => (
            <div
              key={job._id} // Assuming _id is a unique identifier for each job
              className={`job-card ${
                selectedJob === job._id ? "selected" : ""
              }`}
              onClick={() => handleJobClick(job._id)}
            >
              <h3>{job.title}</h3>
              <p>{job.companyName}</p>
              <p>{job.location}</p>
              <p className="job-description">{job.description}</p>
              <p className="job-details-link">
                <span className="link">{job.link}</span>
              </p>
            </div>
          ))}
        </div>
        <div className="pagination">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>{`Page ${currentPage}`}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage * jobsPerPage >= jobs.length}
          >
            Next
          </button>
        </div>
      </div>

      {selectedJob && (
        <div ref={jobDetailRef}>
          <JobDetailsCard
            job={jobs.find((job) => job._id === selectedJob)}
            onClose={() => {
              setSelectedJob(null);
              setIsJobDetailsOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
