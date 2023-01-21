import styled from "styled-components";

const HeroImage = styled.div`
  background-image: url(${(props) => props.image.src});
  height:20em;
  width:16em;
  background-size: cover;
  display:grid;
 justify-self:center;
 padding:3em;
 margin:2em;
 
`;

export default HeroImage;
