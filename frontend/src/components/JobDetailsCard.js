// JobDetailsCard.js
import React from "react";

const JobDetailsCard = ({ job, onClose }) => {
  const handleLinkClick = (event) => {
    event.stopPropagation(); // Prevents closing the card when the link is clicked
  };

  return (
    <div className="job-details-card">
      <h2>{job.title}</h2>
      <p>{job.companyName}</p>
      <p>{job.location}</p>
      <p>{job.description}</p>
      <a href={job.link} target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>
        {job.link}
      </a>
      <button className="close-button" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default JobDetailsCard;
