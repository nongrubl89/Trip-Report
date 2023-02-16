/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import ErrorStyle from '../styles/ErrorStyle';

export default function ErrorComponent(props) {
  return (
    <ErrorStyle>
      <h3>Error: {props.error}</h3>
    </ErrorStyle>
  );
}
