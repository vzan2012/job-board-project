import {
  ApolloClient,
  InMemoryCache,
  gql,
  concat,
  createHttpLink,
  ApolloLink,
} from "@apollo/client";
import { getAccessToken } from "../auth";

const GRAPHQL_URL = import.meta.env.VITE_API_URL;

const httpLink = createHttpLink({
  uri: `${GRAPHQL_URL}/graphql`,
});

const authLink = new ApolloLink((operation, forward) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: concat(authLink, httpLink),
  cache: new InMemoryCache(),
});

/**
 * Job Detail - Fragment
 *
 * @type {*}
 */
const jobDetailFragment = gql`
  fragment JobDetail on Job {
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
`;

/**
 * Company Detail - Fragment
 *
 * @type {*}
 */
const companyDetailFragment = gql`
  fragment CompanyDetail on Company {
    id
    name
    description
    jobs {
      id
      title
      date
    }
  }
`;

/**
 * Company by ID - Query
 *
 * @type {*}
 */
export const companyByIdQuery = gql`
  query company($id: ID!) {
    company(id: $id) {
      ...CompanyDetail
    }
  }
  ${companyDetailFragment}
`;

/**
 * All Jobs - Query
 *
 * @type {*}
 */
export const jobsQuery = gql`
  query {
    jobs {
      ...JobDetail
    }
  }
  ${jobDetailFragment}
`;

/**
 * Jobs By ID - Query
 *
 * @type {*}
 */
export const jobByIdQuery = gql`
  query JobById($id: ID!) {
    job(id: $id) {
      ...JobDetail
    }
  }
  ${jobDetailFragment}
`;

/**
 * Description placeholder
 *
 * @async
 * @param {{ title: any; description: any; }} input
 * @param {*} input.title
 * @param {*} input.description
 * @returns {unknown}
 */
export const createJob = async ({ title, description }) => {
  const mutation = gql`
    mutation CreateJob($input: CreateJobInput!) {
      job: createJob(input: $input) {
        ...JobDetail
      }
    }
    ${jobDetailFragment}
  `;

  const {
    data: { job },
  } = await apolloClient.mutate({
    mutation,
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
