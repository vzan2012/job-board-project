import { getJobs } from "./db/jobs.js";

export const resolvers = {
  Query: {
    jobs: () => getJobs(),
  },
  Job: {
    date: ({ createdAt }) => toISODate(createdAt),
  },
};

// const toISODate = (value) => value.slice(0, "yy-mm-dd".length);
const toISODate = (value) => value.split("T")[0];
