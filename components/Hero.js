import HeroImage from "../styles/HeroImage";
import HeroText from "../styles/HeroText";
import HeroGrid from "../styles/HeroGrid";
import OpenWindow from "../public/images/OpenWindow.png"
import WindownoBG from "../public/images/WindownoBG.png"
import styled, {keyframes} from "styled-components";
import { IconGrid } from "../styles/IconGrid";
import IconCardGrid from "./IconCardGrid";
import Image from "next/image";

export default function Hero() {
  return (
    <>
    <HeroGrid>
    {/* <HeroImage image={WindownoBG}>
    </HeroImage> */}
    <Image src={OpenWindow} height="8em" width="8em"></Image>
    <HeroText>    <h1>With Trip Report, sharing passenger feedback and preferences is easy and convenient.</h1></HeroText>
    </HeroGrid>
    <IconCardGrid/>
    
    
    </>
  );
}
