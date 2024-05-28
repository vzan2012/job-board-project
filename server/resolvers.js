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
    company: ({ companyId }, _args, { companyLoader }) => {
      return companyLoader.load(companyId);
    },
  },
  Company: {
    jobs: ({ id }) => getJobsByCompany(id),
  },
  Mutation: {
    createJob: async (_root, { input: { title, description } }, { user }) => {
      // Checking user is authorized or not
      if (!user) throw unauthorizedError("User is not authorized");

      const companyId = user.companyId;
      return await createJob({ companyId, title, description });
    },
    deleteJob: async (_root, { id }, { user }) => {
      // Checking user is authorized or not
      if (!user) throw unauthorizedError("User is not authorized");

      const deletedJob = await deleteJob(id, user.companyId);
      if (!deletedJob) throw notFoundError(`No Job Found with ID: ${id}`);

      return deletedJob;
    },
    updateJob: async (
      _root,
      { input: { id, title, description } },
      { user }
    ) => {
      // Checking user is authorized or not
      if (!user) throw unauthorizedError("User is not authorized");

      const updatedJob = await updateJob(
        { id, title, description },
        user.companyId
      );
      if (!id) throw notFoundError(`No Job Found with ID: ${id}`);

      return updatedJob;
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
 * Unauthorized Error
 *
 * @param {*} message
 * @returns {*}
 */
const unauthorizedError = (message) => {
  return new GraphQLError(message, {
    extensions: {
      code: "UNAUTHORIZED",
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
