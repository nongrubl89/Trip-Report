/* eslint-disable react/prop-types */
import { Component } from 'react';
import Router from 'next/router';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from '@apollo/client';
import Page from '../components/Page';
import { AuthProvider, useApollo } from '../lib/withData';
import 'bootstrap/dist/css/bootstrap.css';

const theme = {
  colors: {
    primary: '#0070f3',
  },
};

// eslint-disable-next-line no-shadow
// export default function MyApp({ Component, pageProps }) {
//   // const apolloClient = useApollo(pageProps);
//   return (
//     <AuthProvider>
//       <ThemeProvider theme={theme}>
//         <Page>
//           <Component {...pageProps} />
//         </Page>
//       </ThemeProvider>
//     </AuthProvider>
//   );
// }

export default function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </ThemeProvider>
    </ApolloProvider>
  );
}

// export default withData(MyApp);
