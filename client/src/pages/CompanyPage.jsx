import { useState, useEffect } from "react";

import { useParams } from "react-router";

import { getCompanyById } from "../lib/queries";

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

  return (
    <div>
      <h1 className="title">{company.name}</h1>
      <div className="box">{company.description}</div>
    </div>
  );
};

export default CompanyPage;
