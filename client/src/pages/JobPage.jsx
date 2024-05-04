import { useState, useEffect } from "react";
import { formatDate } from "../lib/formatters";

import { getJobById } from "../lib/queries";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

/**
 * JobPage Component
 *
 * @returns {*}
 */
const JobPage = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState({});

  useEffect(() => {
    getJobById(jobId).then(setJob);
  }, [jobId]);

  if (!job) return <div>Loading ...</div>;

  return (
    <div>
      <h1 className="title is-2">{job?.title}</h1>
      <h2 className="subtitle is-4">
        <Link to={`/companies/${job?.company?.id}`}>{job?.company?.name}</Link>
      </h2>
      <div className="box">
        <div className="block has-text-grey">
          Posted: {job?.date ? formatDate(job?.date, "long") : ""}
        </div>
        <p className="block">{job?.description}</p>
      </div>
    </div>
  );
};

export default JobPage;
