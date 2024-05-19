import { useState, useEffect, lazy, Suspense } from "react";

import { useParams } from "react-router";

import { getCompanyById } from "../lib/graphql/queries";
import Loader from "../components/loader/Loader";

// Lazy Load
const LazyJobList = lazy(() => import("../components/JobList"));

/**
 * CompanyPage Component
 *
 * @returns {*}
 */
const CompanyPage = () => {
  const { companyId } = useParams();

  const [state, setState] = useState({
    company: null,
    loading: true,
    error: false,
  });

  useEffect(() => {
    (async () => {
      try {
        const company = await getCompanyById(companyId);

        setState({ company, loading: false, error: false });
      } catch (error) {
        setState({
          company: null,
          loading: false,
          error: true,
        });
      }
    })();
  }, [companyId]);

  const { company, loading } = state;

  if (loading) {
    <Loader />;
  } else {
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
