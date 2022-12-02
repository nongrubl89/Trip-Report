import PropTypes from "prop-types";
import styled, { createGlobalStyle } from "styled-components";
import NavigationBar from "./Nav";

const GlobalStyles = createGlobalStyle`

  html {
    box-sizing: border-box;
    font-size:62.5%;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    font-family: 'Playfair Display', serif;
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height:2;
    background-color: #99C5F8;
  }

  a {
    text-decoration: none;
    color: black;
  }
  a:hover {
    color:orange;
  }

  button {
    font-family: 'Playfair Display', serif;
  }
`;

const InnerStyles = styled.div`
  margin: 0 auto;
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

Page.propTypes = {
  children: PropTypes.any,
};
