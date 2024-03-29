/* eslint-disable no-unused-vars */
// /* eslint-disable react/jsx-no-bind */
// /* eslint-disable no-unused-vars */
import { useState } from 'react';
// import { useAuth } from '../lib/withData';
import gql from 'graphql-tag';
import Image from 'next/image';
import { useMutation } from '@apollo/client';
import Router from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import { useAuthToken } from '../lib/withAuth';
import { useUser } from '../lib/useUser';
import MasterGrid from '../styles/MasterGrid';
import CardItem from '../styles/CardItem';
import Form from '../styles/Form';
import ButtonGrid from '../styles/ButtonGrid';
import WindownoBG from '../public/images/WindownoBG.png';
import useForm from '../lib/useForm';

const REGISTER_MUTATION = gql`
  mutation register($email: String!, $username: String!, $password: String!) {
    register(
      input: { email: $email, username: $username, password: $password }
    ) {
      jwt
      user {
        username
        email
      }
    }
  }
`;

export default function Register() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    username: '',
    email: '',
    password: '',
  });
  const [register, { ldg, err, dta }] = useMutation(REGISTER_MUTATION, {
    variables: inputs,
  });

  const [authToken] = useAuthToken();
  const userData = useUser();
  const success = () =>
    toast('Thanks for registering! You can login now.', {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  if (userData.data && authToken) {
    return <div>You&apos;re Logged In</div>;
  }
  return (
    <MasterGrid justifyContent="center">
      <CardItem
        height="min-content"
        justifyContent="center"
        alignItems="center"
      >
        <Image
          src={WindownoBG}
          height="1em"
          width="1em"
          alt="Airplane Window"
        />
        <h3 style={{ textAlign: 'center', margin: '1em' }}>
          Register for an account
        </h3>
        <Form
          onSubmit={async (e) => {
            e.preventDefault();
            console.log(inputs);
            const res = await register();
            console.log(res);
            clearForm();
            success();
            Router.push({ pathname: `/login` });
          }}
          padding="0px"
        >
          <label htmlFor="Username">
            Username
            <input
              required
              type="text"
              id="username"
              name="username"
              placeholder="username"
              value={inputs.username}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="Email">
            Email Address
            <input
              required
              type="text"
              id="email"
              name="email"
              placeholder="example@example.com"
              value={inputs.email}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="Password">
            Password
            <input
              required
              type="password"
              id="password"
              name="password"
              placeholder="password"
              value={inputs.password}
              onChange={handleChange}
            />
          </label>
          <ButtonGrid>
            <button type="submit">Create Account</button>
          </ButtonGrid>
        </Form>
      </CardItem>
    </MasterGrid>
  );
}
