// import Image from 'next/image';
// import HeroText from '../styles/HeroText';
// import HeroGrid from '../styles/HeroGrid';
// import OpenWindow from '../public/images/OpenWindow.png';
// import IconCardGrid from './IconCardGrid';
import { useState } from 'react';
// import { useAuth } from '../lib/withData';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useAuthToken } from '../lib/withAuth';
import { useUser } from '../lib/useUser';
import { useLoginMutation } from '../lib/useLogin';

const LOGIN_MUTATION = gql`
  mutation login($login: String!, $password: String!) {
    login(input: { identifier: $login, password: $password }) {
      jwt
    }
  }
`;

export default function Hero() {
  const [loginMutation, loginMutationResults] = useLoginMutation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function onSubmit(e) {
    e.preventDefault();
    loginMutation(username, password);
  }
  const [authToken] = useAuthToken();
  const userData = useUser();
  if (userData.data && authToken) {
    return <div>You're Logged In</div>;
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
  // return (
  //   <>
  //     <HeroGrid>
  //       <Image src={OpenWindow} height="8em" width="8em" />
  //       <HeroText>
  //         {' '}
  //         <h1>
  //           With Trip Report, sharing passenger feedback and preferences is easy
  //           and convenient.
  //         </h1>
  //       </HeroText>
  //     </HeroGrid>

  //     <IconCardGrid />
  //   </>
  // );
}
