import styled from "styled-components";

const MasterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  padding: 2em;
  grid-gap: 2em;
  justify-content: center;
  margin: 1em;
`;

export default MasterGrid;
