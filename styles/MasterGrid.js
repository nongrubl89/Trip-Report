import styled from "styled-components";

const MasterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 400px));
  grid-gap: 2em;
  justify-content: left;
  /* margin: 1em; */
  background:black;
`;

export default MasterGrid;
