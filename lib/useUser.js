import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const USER_QUERY = gql`
  query user {
    me {
      id
      username
      email
    }
  }
`;

export function useUser() {
  const data = useQuery(USER_QUERY);
  return data;
}
