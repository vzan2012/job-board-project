import { connection } from "./connection.js";
import DataLoader from "dataloader";

/**
 * Get Company Table
 *
 * @returns {*}
 */
const getCompanyTable = () => connection.table("company");

/**
 * Get Company by Job ID
 *
 * @async
 * @param {*} id
 * @returns {unknown}
 */
export const getCompany = async (id) =>
  await getCompanyTable().first().where({ id });

export const createCompanyLoader = () => {
  return new DataLoader(async (ids) => {
    const companies = await getCompanyTable().select().whereIn("id", ids);

    return ids.map((id) => companies.find((company) => company.id === id));
  });
};
