import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from '@apollo/client';
import { onError } from 'apollo-link-error';
import { useAuthToken } from './withAuth';
// import { prodEndpoint } from '../config';

const GRAPHQL_URL = 'http://localhost:1337/graphql' || 'process.env.PROD_URL';

// const httpLink = new HttpLink({ uri: 'http://localhost:1337/graphql' });

const link = new HttpLink({
  fetch, // Switches between unfetch & node-fetch for client & server.
  uri: GRAPHQL_URL,
});

const authMiddleware = (authToken) =>
  new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    if (authToken) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      });
    }

    return forward(operation);
  });

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const cache = new InMemoryCache({});

export const useApollo = () => {
  const [authToken] = useAuthToken();
  return new ApolloClient({
    link: ApolloLink.from([errorLink, authMiddleware(authToken).concat(link)]),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    cache,
  });
};
