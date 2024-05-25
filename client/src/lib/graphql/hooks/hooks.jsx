import { useQuery } from "@apollo/client";
import { companyByIdQuery, jobByIdQuery, jobsQuery } from "../queries";

/**
 * Company - Hook
 *
 * @param {*} id
 * @returns {{ company: any; loading: any; error: any; }}
 */
export const useCompany = (id) => {
  const { data, error, loading } = useQuery(companyByIdQuery, {
    variables: {
      id,
    },
  });
  return { company: data?.company, loading, error: Boolean(error) };
};

/**
 * Jobs - Hook
 *
 * @returns {{ jobs: any; loading: any; error: any; }}
 */
export const useJobs = () => {
  const { data, error, loading } = useQuery(jobsQuery, {
    fetchPolicy: "network-only",
  });

  return { jobs: data?.jobs, loading, error: Boolean(error) };
};

/**
 * Job by Id - Hook
 *
 * @param {*} id
 * @returns {{ job: any; loading: any; error: any; }}
 */
export const useJob = (id) => {
  const { data, error, loading } = useQuery(jobByIdQuery, {
    variables: {
      id,
    },
  });

  return { job: data?.job, loading, error: Boolean(error) };
};
