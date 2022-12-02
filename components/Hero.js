import HeroImage from "../styles/HeroImage";
import HeroText from "../styles/HeroText";
import jumbotronimg from "../public/images/jumbotronimg.jpg";
import Button from "../styles/Button";
import ButtonGrid from "../styles/ButtonGrid";
import HeroGrid from "../styles/HeroGrid";

export default function Hero() {
  return (
    <HeroImage image={jumbotronimg}>
      <HeroText>
        <h1>
          Trip Report helps crew members track and report passenger preferences
          in one convenient place. Sharing passenger feedback has never been
          easier.
        </h1>
        <ButtonGrid>
          <Button gridColumn="1/2">See My Trips</Button>
          <Button gridColumn="2/3">Register</Button>
        </ButtonGrid>
      </HeroText>
    </HeroImage>
  );
}
