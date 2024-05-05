import { useState, useEffect } from "react";

import { useParams } from "react-router";

import { getCompanyById } from "../lib/queries";
import JobList from "../components/JobList";

/**
 * CompanyPage Component
 *
 * @returns {*}
 */
const CompanyPage = () => {
  const { companyId } = useParams();

  const [company, setCompany] = useState({});

  useEffect(() => {
    const getCompanyData = (companyId) => getCompanyById(companyId);

    getCompanyData(companyId).then(setCompany);
  }, [companyId]);

  if (!company) return <div>Loading ...</div>;

  const { name, description, jobs } = company;

  return (
    <div>
      <h1 className="title">{name}</h1>
      <div className="box">{description}</div>
      <h2 className="title is-5">Jobs at {name}</h2>
      <JobList jobs={jobs} />
    </div>
  );
};

export default CompanyPage;
