import styled from 'styled-components';

const Form = styled.form`
  padding: 20px;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 600;
  width: 75%;
  margin: auto;
  label {
    display: block;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }
  input {
    height: 50px;
  }
  textarea {
    height: 150px;
  }
  input,
  textarea,
  select {
    width: 100%;
    font-size: 1.5rem;
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.05);
    padding: 1rem;
    border: none;
    border-radius: 10px;
    &:focus {
      outline: 0;
      border-color: var(--red);
    }
  }
  /* button,
  input[type="submit"] {
    width: auto;
    background: red;
    color: white;
    border: 0;
    font-size: 1.5rem;
    font-weight: 300;
    padding: 2rem;
  } */
`;

export default Form;
