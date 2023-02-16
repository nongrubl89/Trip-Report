import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const userQueryGQL = gql`
  query user {
    me {
      id
      username
      email
    }
  }
`;

export const useUserQuery = () => useQuery(userQueryGQL);
