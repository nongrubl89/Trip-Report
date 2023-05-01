import styled from 'styled-components';

const CardItem = styled.div`
  background: whitesmoke;
  border: none;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
  padding: 2em;
  border-radius: 8px;
  margin: 2em;
  height: ${(props) => props.height || '140px'};
  border-bottom: 25px #3c4c9f solid;
  justify-content: ${(props) => props.justifyContent || 'left'};
  align-items: ${(props) => props.alignItems || ''};
  display: flex;
  flex-direction: column;
  /* display: grid;
  grid-template-columns: 90% 10%; */

  /* svg {
    margin-bottom: 30px;
  } */

  h2 {
    font-weight: 700;
    /* margin-bottom: 1em; */
    font-size: 1em;
    width: 75%;
  }

  img {
    height: 12em;
    width: 10em;
  }
`;

export default CardItem;
