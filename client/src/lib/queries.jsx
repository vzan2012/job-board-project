import { GraphQLClient, gql } from "graphql-request";

const GRAPHQL_URL = import.meta.env.VITE_API_URL;

const client = new GraphQLClient(GRAPHQL_URL);

/**
 * Get Jobs - Query
 *
 * @async
 * @returns {unknown}
 */
export const getJobs = async () => {
  const query = gql`
    query {
      jobs {
        id
        title
        date
        description
        company {
          id
          name
          description
        }
      }
    }
  `;

  const { jobs } = await client.request(query);
  return jobs;
};

/**
 * Get Job By Id - Query
 *
 * @async
 * @param {*} id
 * @returns {unknown}
 */
export const getJobById = async (id) => {
  const query = gql`
    query JobById($id: ID!) {
      job(id: $id) {
        id
        title
        description
        company {
          id
          name
          description
        }
      }
    }
  `;

  const { job } = await client.request(query, { id });

  return job;
};

/**
 * Get Company By Id - Query
 *
 * @async
 * @param {*} id
 * @returns {unknown}
 */
export const getCompanyById = async (id) => {
  const query = gql`
    query company($id: ID!) {
      company(id: $id) {
        id
        name
        description
      }
    }
  `;

  const { company } = await client.request(query, { id });

  return company;
};
