import { useEffect, useState } from "react";
import JobList from "../components/JobList";
// import { jobs } from "../lib/fake-data";
import { getJobs } from "../lib/queries";

/**
 * HomePage Component
 *
 * @returns {*}
 */
const HomePage = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const getJobsData = async () => {
      const data = await getJobs();

      setJobs(data);
    };

    getJobsData();
  }, []);

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
};

export default HomePage;
