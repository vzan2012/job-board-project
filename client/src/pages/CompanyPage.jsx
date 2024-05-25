import { lazy, Suspense } from "react";

import { useParams } from "react-router";
import Loader from "../components/loader/Loader";
import { useCompany } from "../lib/graphql/hooks/hooks";

// Lazy Load
const LazyJobList = lazy(() => import("../components/JobList"));

/**
 * CompanyPage Component
 *
 * @returns {*}
 */
const CompanyPage = () => {
  const { companyId } = useParams();

  const { company, loading, error } = useCompany(companyId);

  if (loading) {
    <Loader />;
  }

  if (error) {
    <div className="has-text-danger">Data Unavailable</div>;
  }

  return (
    <div>
      <h1 className="title">{company?.name}</h1>
      <div className="box">{company?.description}</div>
      <h2 className="title is-5">Jobs at {company?.name}</h2>
      <Suspense loading={<Loader />}>
        <LazyJobList jobs={company?.jobs} />
      </Suspense>
    </div>
  );
};

export default CompanyPage;
