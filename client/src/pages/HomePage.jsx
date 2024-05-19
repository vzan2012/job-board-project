import { useEffect, useState, lazy, Suspense } from "react";
import Loader from "../components/loader/Loader";
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

      console.log(data);

      setJobs(data);
    };

    getJobsData();
  }, []);

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <Suspense loading={<Loader />}>
        <LazyJobList jobs={jobs} />
      </Suspense>
    </div>
  );
};

export default HomePage;
