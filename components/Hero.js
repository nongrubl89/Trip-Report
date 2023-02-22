import Image from 'next/image';
import HeroText from '../styles/HeroText';
import HeroGrid from '../styles/HeroGrid';
import OpenWindow from '../public/images/OpenWindow.png';
import IconCardGrid from './IconCardGrid';

export default function Hero() {
  return (
    <>
      <HeroGrid>
        <Image src={OpenWindow} alt="AirplaneWindow" height="8em" width="8em" />
        <HeroText>
          {' '}
          <h1>
            With Trip Report, sharing passenger feedback and preferences is easy
            and convenient.
          </h1>
        </HeroText>
      </HeroGrid>

      <IconCardGrid />
    </>
  );
}
