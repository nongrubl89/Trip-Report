import styled, {keyframes} from "styled-components";

const softBounce = keyframes`
0%{transform: translateX(0);}
50%{transform: translateX(100px);}
100%{transform: translateX(0);}
`

const CardItem = styled.div`
  background: whitesmoke;
  border: none;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
  padding: 2em;
  border-radius: 8px;
  margin: 2em;
  svg {
    animation-name: ${softBounce}
    animation-duration:1s;
    animation-iteration-count:1;
  }
  a svg:hover {
    animation-name: ${softBounce}
    animation-duration:1s;
    animation-iteration-count:1;
  }
  h2 {
    font-weight: 700;
    margin-bottom: 1em;
  }
`;


export default CardItem;
