/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
// import { useAuth } from '../lib/withData';
import gql from 'graphql-tag';
import Image from 'next/image';
import Link from 'next/link';
import { useAuthToken } from '../lib/withAuth';
import { useUser } from '../lib/useUser';
import { useLoginMutation } from '../lib/useLogin';
import MasterGrid from '../styles/MasterGrid';
import CardItem from '../styles/CardItem';
import Form from '../styles/Form';
import ButtonGrid from '../styles/ButtonGrid';
import WindownoBG from '../public/images/WindownoBG.png';

const LOGIN_MUTATION = gql`
  mutation login($login: String!, $password: String!) {
    login(input: { identifier: $login, password: $password }) {
      jwt
    }
  }
`;

export default function Login() {
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
    <MasterGrid justifyContent="center">
      <CardItem
        height="min-content"
        justifyContent="center"
        alignItems="center"
      >
        <Image src={WindownoBG} height="1em" width="1em" />
        <h3 style={{ textAlign: 'center', margin: '1em' }}>Sign In</h3>
        <h3 style={{ textAlign: 'center', margin: '1em' }}>
          <Link href="/register">Not registered? Create an account!</Link>
        </h3>
        <Form onSubmit={onSubmit} padding="0px">
          <label htmlFor="Username">
            Username
            <input
              required
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label htmlFor="EmailAddress">
            Email Address
            <input
              required
              type="password"
              id="password"
              name="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <ButtonGrid>
            <button type="submit">Submit</button>
          </ButtonGrid>
        </Form>
      </CardItem>
    </MasterGrid>
  );
}
