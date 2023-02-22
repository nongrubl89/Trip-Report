// import { useApolloClient } from "@apollo/react-hooks";
// import { ApolloClient } from '@apollo/client';

import { useCookies } from 'react-cookie';
import { useApolloClient } from '@apollo/client';
import Router from 'next/router';

const TOKEN_NAME = 'authToken';

// custom hook to handle authToken - we use compositon to decouple the auth system and it's storage
export const useAuthToken = () => {
  const [cookies, setCookie, removeCookie] = useCookies([TOKEN_NAME]);
  const setAuthToken = (authToken) => setCookie(TOKEN_NAME, authToken);
  const removeAuthToken = () => removeCookie(TOKEN_NAME);
  return [cookies[TOKEN_NAME], setAuthToken, removeAuthToken];
};

export const useLogout = () => {
  const [, , removeAuthToken] = useAuthToken();
  const apolloClient = useApolloClient();

  const logout = async () => {
    await apolloClient.clearStore(); // we remove all information in the store
    removeAuthToken();
    Router.push('/login');
  };
  return logout;
};
