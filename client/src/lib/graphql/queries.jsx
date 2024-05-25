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

const apolloClient = new ApolloClient({
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
 * Jobs By ID - Query
 *
 * @type {*}
 */
const jobByIdQuery = gql`
  query JobById($id: ID!) {
    job(id: $id) {
      ...JobDetail
    }
  }
  ${jobDetailFragment}
`;

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
        ...JobDetail
      }
    }
    ${jobDetailFragment}
  `;

  const {
    data: { jobs },
  } = await apolloClient.query({ query, fetchPolicy: "network-only" });

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
  const {
    data: { job },
  } = await apolloClient.query({
    query: jobByIdQuery,
    variables: {
      id,
    },
  });
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
        ...CompanyDetail
      }
    }
    ${companyDetailFragment}
  `;

  const {
    data: { company },
  } = await apolloClient.query({
    query,
    variables: {
      id,
    },
  });

  return company;
};

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
