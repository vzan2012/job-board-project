import { connection } from "./connection.js";

/**
 * Get Company Table
 *
 * @returns {*}
 */
const getCompanyTable = () => connection.table("company");

/**
 * Get Company by ID
 *
 * @async
 * @param {*} id
 * @returns {unknown}
 */
export const getCompany = async (id) =>
  await getCompanyTable().first().where({ id });
