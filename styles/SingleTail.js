import styled from "styled-components";

const SingleTail = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  padding: 2em;
  grid-gap: 2em;
  justify-content: center;
  background: whitesmoke;
  margin: 2em;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  white-space: pre-line;
`;

export default SingleTail;
