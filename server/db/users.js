import { connection } from "./connection.js";

/**
 * Get User Table
 *
 * @returns {*}
 */
const getUserTable = () => connection.table("user");

/**
 * Get User By Id
 *
 * @async
 * @param {*} id
 * @returns {unknown}
 */
export const getUser = async (id) => await getUserTable().first().where({ id });

/**
 * Get User By Email
 *
 * @async
 * @param {*} email
 * @returns {unknown}
 */
export const getUserByEmail = async (email) =>
  await getUserTable().first().where({ email });
