import React, { useState, useContext, createContext } from 'react';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql,
  ApolloLink,
} from '@apollo/client';
import { useAuthToken } from './withAuth';

const httpLink = new HttpLink({ uri: 'http://localhost:1337/graphql' });

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
    ssrMode: false,
    link: authMiddleware(authToken).concat(httpLink),
    cache,
  });
};

// const authContext = createContext();

// export function AuthProvider({ children }) {
//   const auth = useProvideAuth();

//   return (
//     <authContext.Provider value={auth}>
//       <ApolloProvider client={auth.createApolloClient()}>
//         {children}
//       </ApolloProvider>
//     </authContext.Provider>
//   );
// }

// export const useAuth = () => {
//   return useContext(authContext);
// };

// function useProvideAuth() {
//   const [authToken, setAuthToken] = useState(null);

//   const isSignedIn = () => {
//     if (authToken) {
//       return true;
//     }
//     return false;
//   };

//   const getAuthHeaders = () => {
//     if (!authToken) return null;

//     return {
//       authorization:
//         'Bearer 925e11f0304fa7bd26310434381179f04cece9910e1f2b484babccb9c8ccd543d59d5724facaa7f8159656f9edf0ef2f09afa189e76e944b375104289b81d2db7ae40545ec44ece8706387e841c48ccdd4a892bd2474b9d464b881a50b560b375d3ef1c8ee341ad33dd8497d0f41da814a3c11868be599660c516e05feeab901',
//     };
//   };

//   const createApolloClient = () => {
//     const link = new HttpLink({
//       uri: 'http://localhost:1337/graphql',
//       headers: getAuthHeaders(),
//     });

//     return new ApolloClient({
//       link,
//       cache: new InMemoryCache(),
//     });
//   };

//   const signIn = async ({ identifier, password }) => {
//     const client = createApolloClient();
//     const LoginMutation = gql`
//       mutation login($identifier: String!, $password: String!) {
//         login(identifier: $identifier, password: $password) {
//           jwt
//         }
//       }
//     `;

//     const result = await client.mutate({
//       mutation: LoginMutation,
//       variables: { identifier, password },
//     });

//     console.log(result);

//     if (result?.data?.login?.token) {
//       setAuthToken(result.data.login.token);
//     }
//   };

//   const signOut = () => {
//     setAuthToken(null);
//   };

//   return {
//     setAuthToken,
//     isSignedIn,
//     signIn,
//     signOut,
//     createApolloClient,
//   };
// }
