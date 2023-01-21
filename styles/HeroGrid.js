import styled from "styled-components";

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns:repeat(auto-fit, minmax(300px, 1fr) );
  justify-content:center;
  align-items:center;
  justify-items:center;
  gap:1em;
  h1{
    width:75%;
    font-weight:600;
    text-align:center;
    background-color:#93dbfb;
    justify-self:center;
    padding:5em;
    font-size:1em;

    @media (max-width: 600px) {
      padding:1.5em;
    }

  }
  img{
    height:20em;
    width:auto;
  }
`;

export default HeroGrid;
