import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from '@apollo/client';
import { useAuthToken } from './withAuth';
import { prodEndpoint } from '../config';

const GRAPHQL_URL = 'http://localhost:1337/graphql' || prodEndpoint;

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

const cache = new InMemoryCache({});

export const useApollo = () => {
  const [authToken] = useAuthToken();
  return new ApolloClient({
    link: authMiddleware(authToken).concat(link),
    cache,
  });
};
