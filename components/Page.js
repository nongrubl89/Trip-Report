/* eslint-disable react/prop-types */
import styled, { createGlobalStyle } from 'styled-components';
import NavigationBar from './Nav';

const GlobalStyles = createGlobalStyle`

  html {
    box-sizing: border-box;
    font-size:62.5%;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    font-family: 'Sofia Sans', sans-serif;
    padding: 0;
    margin:0;
    font-size: 1.5rem;
    line-height:2;
    background:#93dbfb;
  }

  a {
    text-decoration: none;
    color: black;
  }


  button {
    font-family: 'Playfair Display', serif;
  }
`;

const InnerStyles = styled.div`
  margin: auto;
`;

export default function Page({ children }) {
  console.log(children);
  return (
    <div>
      <GlobalStyles />
      <NavigationBar />
      <InnerStyles>{children}</InnerStyles>
    </div>
  );
}
