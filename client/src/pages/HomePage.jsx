import { useEffect, useState, lazy, Suspense } from "react";
import { getJobs } from "../lib/graphql/queries";

// Lazy Load
const LazyJobList = lazy(() => import("../components/JobList"));

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
      <Suspense loading={<div>Loading...</div>}>
        <LazyJobList jobs={jobs} />
      </Suspense>
    </div>
  );
};

export default HomePage;
