import styled from "styled-components";

const CardItem = styled.div`
  background: whitesmoke;
  border: none;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
  padding: 2em;
  border-radius: 8px;
  a svg {
    padding-left: 0;
    transition-duration: 0.4s;
  }
  a svg:hover {
    padding-left: 5em;
    transition-duration: 0.4s;
  }
  h2 {
    font-weight: 700;
    margin-bottom: 1em;
  }
`;

export default CardItem;
