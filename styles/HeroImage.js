import styled from "styled-components";

const HeroImage = styled.div`
  background-image: url(${(props) => props.image.src});
  width: 100%;
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  display: grid;
  grid-template-columns: repeat(auto-fill, (100px, max-content));
  justify-content: center;
  align-content: center;
`;

export default HeroImage;
