/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import Page from '../components/Page';
import { useApollo } from '../lib/withData';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import '../public/styles.css';

const theme = {
  colors: {
    primary: '#0070f3',
  },
};

export default function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);
  console.log(apolloClient);
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <Page>
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Component {...pageProps} />
        </Page>
      </ThemeProvider>
    </ApolloProvider>
  );
}

// export default withData(MyApp);
