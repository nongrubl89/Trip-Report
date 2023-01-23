import styled from 'styled-components';

const MasterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 400px));
  grid-gap: 2em;
  justify-content: left;
  height: 100vh;
  background: #93dbfb;
  h3 {
    margin: 2.5em;
  }
`;

export default MasterGrid;
