import { lazy, Suspense } from "react";
import Loader from "../components/loader/Loader";
import { useJobs } from "../lib/graphql/hooks/hooks";

// Lazy Load
const LazyJobList = lazy(() => import("../components/JobList"));

/**
 * HomePage Component
 *
 * @returns {*}
 */
const HomePage = () => {
  const { jobs, loading, error } = useJobs();

  if (loading) {
    <Loader />;
  }

  if (error) {
    <div className="has-text-danger">Data Unavailable</div>;
  }

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
