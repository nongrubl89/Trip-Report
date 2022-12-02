import styled from "styled-components";

const Button = styled.button`
  background-color: black;
  border-radius: 8px;
  padding: 1em;
  border: none;
  color: white;
  font-weight: 700;
  width: 200px;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
  grid-column: ${(props) => props.gridColumn};
  margin: 1em;
`;

export default Button;
