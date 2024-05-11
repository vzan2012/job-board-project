import { GraphQLError } from "graphql";
import {
  getJobs,
  getJob,
  getJobsByCompany,
  createJob,
  deleteJob,
  updateJob,
} from "./db/jobs.js";
import { getCompany } from "./db/companies.js";

/**
 * Resolvers
 *
 * @type {{ Query: { jobs: () => any; }; Job: { date: ({ createdAt }: { createdAt: any; }) => any; }; }}
 */
export const resolvers = {
  Query: {
    company: async (_root, { id }) => {
      const company = await getCompany(id);
      if (!company) throw notFoundError(`No Company Found with ID: ${id}`);

      return company;
    },
    job: async (_root, { id }) => {
      const job = await getJob(id);
      if (!job) throw notFoundError(`No Job Found with ID: ${id}`);

      return job;
    },
    jobs: () => getJobs(),
  },
  Job: {
    date: ({ createdAt }) => toISODate(createdAt),
    company: ({ companyId }) => getCompany(companyId),
  },
  Company: {
    jobs: ({ id }) => getJobsByCompany(id),
  },
  Mutation: {
    createJob: async (_root, { input: { title, description } }) => {
      const companyId = "FjcJCHJALA4i";
      return await createJob({ companyId, title, description });
    },
    deleteJob: async (_root, { id }) => {
      const { id: jobId } = await deleteJob(id);
      if (!jobId) throw notFoundError(`No Job Found with ID: ${jobId}`);

      return `Job Id: ${jobId} post has been deleted`;
    },
    updateJob: async (_root, { input: { id, title, description } }) => {
      const job = await updateJob({ id, title, description });
      if (!id) throw notFoundError(`No Job Found with ID: ${id}`);

      return job;
    },
  },
};

/**
 * Not Found Error
 *
 * @param {*} message
 * @returns {*}
 */
const notFoundError = (message) => {
  return new GraphQLError(message, {
    extensions: {
      code: "NOT FOUND",
    },
  });
};

/**
 * Format the Date (removing the time, retain only the dates - `yyyy-mm-dd` format)
 *
 * @param {*} value
 * @returns {*}
 */
const toISODate = (value) => value.slice(0, "yyyy-mm-dd".length);
