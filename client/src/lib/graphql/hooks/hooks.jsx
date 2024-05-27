import { useMutation, useQuery } from "@apollo/client";
import {
  companyByIdQuery,
  createJobMutation,
  jobByIdQuery,
  jobsQuery,
} from "../queries";

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

/**
 * CreateJob - Hook
 *
 * @returns {{ createJob: (title: any, description: any) => unknown; loading: any; error: any; }}
 */
export const useCreateJob = () => {
  const [mutuate, { loading, error }] = useMutation(createJobMutation);

  const createJob = async (title, description) => {
    const {
      data: { job },
    } = await mutuate({
      variables: {
        input: {
          title,
          description,
        },
      },
      update: (cache, result) => {
        const { data } = result;

        cache.writeQuery({
          query: jobByIdQuery,
          variables: {
            id: data.job.id,
          },
          data,
        });
      },
    });
    return job;
  };

  return { createJob, loading, error };
};
