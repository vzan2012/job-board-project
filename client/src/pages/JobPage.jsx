import { useState, useEffect } from "react";
import { formatDate } from "../lib/utils/formatters";

import { getJobById } from "../lib/graphql/queries";
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

  const { title, company, date, description } = job;

  return (
    <div>
      <h1 className="title is-2">{title}</h1>
      <h2 className="subtitle is-4">
        <Link to={`/companies/${company?.id}`}>{company?.name}</Link>
      </h2>
      <div className="box">
        <div className="block has-text-grey">
          Posted: {date ? formatDate(date, "long") : ""}
        </div>
        <p className="block">{description}</p>
      </div>
    </div>
  );
};

export default JobPage;
