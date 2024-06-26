import { connection } from "./connection.js";
import { generateId } from "./ids.js";

/**
 * Get Job Table
 *
 * @returns {*}
 */
const getJobTable = () => connection.table("job");

/**
 * Get Jobs from Job Table
 *
 * @async
 * @returns {unknown}
 */
export const getJobs = async () => await getJobTable().select();

/**
 * Get Jobs by Company
 *
 * @async
 * @param {*} companyId
 * @returns {unknown}
 */
export const getJobsByCompany = async (companyId) =>
  await getJobTable().select().where({ companyId });

/**
 * Get Job by Id
 *
 * @async
 * @param {*} id
 * @returns {unknown}
 */
export const getJob = async (id) => await getJobTable().first().where({ id });

/**
 * Create / Insert Job
 *
 * @async
 * @param {{ companyId: any; title: any; description: any; }} param0
 * @param {*} param0.companyId
 * @param {*} param0.title
 * @param {*} param0.description
 * @returns {unknown}
 */
export const createJob = async ({ companyId, title, description }) => {
  const job = {
    id: generateId(),
    companyId,
    title,
    description,
    createdAt: new Date().toISOString(),
  };

  await getJobTable().insert(job);
  return job;
};

/**
 * Delete Job by Id
 *
 * @async
 * @param {*} id
 * @returns {unknown}
 */
export const deleteJob = async (id, companyId) => {
  const job = await getJobTable().first().where({ id, companyId });
  if (!job) {
    throw new Error(`Job not found: ${id}`);
  }
  await getJobTable().delete().where({ id });
  return job;
};

/**
 * Update Job by Id
 *
 * @async
 * @param {{ id: any; title: any; description: any; }} param0
 * @param {*} param0.id
 * @param {*} param0.title
 * @param {*} param0.description
 * @returns {unknown}
 */
export const updateJob = async ({ id, title, description }, companyId) => {
  const job = await getJobTable().first().where({ id, companyId });
  if (!job) {
    throw new Error(`Job not found: ${id}`);
  }
  const updatedFields = { title, description };
  await getJobTable().update(updatedFields).where({ id });
  return { ...job, ...updatedFields };
};
