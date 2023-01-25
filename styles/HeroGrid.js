import styled, { keyframes } from 'styled-components';

const moveInRight = keyframes`
    0% {
    opacity: 0;
    transform: translateX(20rem);
    }

    100% {
    opacity: 1;
    transform: translate(0);
    }
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  justify-content: center;
  align-items: center;
  justify-items: center;
  gap: 1em;
  background: white;
  h1 {
    width: 75%;
    font-weight: 600;
    text-align: center;
    background-color: #93dbfb;
    justify-self: center;
    padding: 5em;
    font-size: 2em;
    animation: ${moveInRight} 1s ease 0.3s both;

    @media (max-width: 600px) {
      padding: 1.5em;
    }
  }
  img {
    height: 20em;
    width: auto;
    margin: 2em;
  }
`;

export default HeroGrid;
