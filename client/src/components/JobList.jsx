/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { formatDate } from "../lib/formatters";

/**
 * Job Item
 *
 * @param {{ job: any; }} param0
 * @param {*} param0.job
 * @returns {*}
 */
const JobItem = ({ job }) => {
  const title = job.company ? `${job.title} at ${job.company.name}` : job.title;

  return (
    <li className="media">
      <div className="media-left has-text-grey">{formatDate(job.date)}</div>
      <div className="media-content">
        <Link to={`/jobs/${job.id}`}>{title}</Link>
      </div>
    </li>
  );
};

/**
 * List of Job Items
 *
 * @param {{ jobs: any; }} param0
 * @param {*} param0.jobs
 * @returns {*}
 */
const JobList = ({ jobs }) => {
  return (
    <ul className="box">
      {jobs.map((job) => (
        <JobItem key={job.id} job={job} />
      ))}
    </ul>
  );
};

export default JobList;
