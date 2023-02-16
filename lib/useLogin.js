import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useAuthToken } from './withAuth';

export const LOGIN_MUTATION = gql`
  mutation login($login: String!, $password: String!) {
    login(input: { identifier: $login, password: $password }) {
      jwt
    }
  }
`;

export const useLoginMutation = () => {
  const [_, setAuthToken, removeAuthtoken] = useAuthToken();

  const [mutation, mutationResults] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      setAuthToken(data.login.jwt);
      console.log(data);
    },
  });

  // full login function
  const login = (user, password) => {
    removeAuthtoken();
    return mutation({
      variables: {
        login: user,
        password,
      },
    });
  };
  return [login, mutationResults];
};
