import { getJobs } from "./db/jobs.js";
import { getCompany } from "./db/companies.js";

/**
 * Resolvers
 *
 * @type {{ Query: { jobs: () => any; }; Job: { date: ({ createdAt }: { createdAt: any; }) => any; }; }}
 */
export const resolvers = {
  Query: {
    jobs: () => getJobs(),
  },
  Job: {
    date: ({ createdAt }) => toISODate(createdAt),
    company: ({ companyId }) => getCompany(companyId),
  },
};

/**
 * Format the Date (removing the time, retain only the dates - `yyyy-mm-dd` format)
 *
 * @param {*} value
 * @returns {*}
 */
const toISODate = (value) => value.slice(0, "yyyy-mm-dd".length);
