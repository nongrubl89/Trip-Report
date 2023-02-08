import styled from 'styled-components';

const MasterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 400px));
  grid-gap: 2em;
  justify-content: ${(props) => props.justifyContent || 'left'};
  height: max-content;
  background: #93dbfb;
  width: 75%;
  h3 {
    margin: 2.5em;
  }
`;

export default MasterGrid;
