import styled from 'styled-components';

const ButtonGrid = styled.div`
  display: flex;
  place-self: ${(props) => props.placeSelf || ''};
  align-items: ${(props) => props.alignItems || ''};
  justify-content: ${(props) => props.justifyContent || ''};
  gap: 0.5em;
  flex-wrap: wrap;
  button {
    border-radius: 10px;
    padding: 8px 8px;
    border: 1px solid black;
    background-color: black;
    color: white;
    box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
    font-family: 'Sofia Sans', sans-serif;
  }
  button:hover {
    color: whitesmoke;
  }
  label,
  input {
    flex: 1;
  }
`;
export default ButtonGrid;
