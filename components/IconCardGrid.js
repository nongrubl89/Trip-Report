/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import Image from 'next/image';
import { motion } from 'framer-motion';
import { IconGrid } from '../styles/IconGrid';
import { IconWithText } from '../styles/IconWithText';
import Airplane from '../public/images/Airplane.png';
import Share from '../public/images/Share.png';
import Seat3 from '../public/images/Seat3.png';
import Calendar from '../public/images/Calendar.png';

const animationVariants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 0,
    rotate: 0,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 1,
    },
  },
};

const icons = [
  {
    src: Calendar,
    alt: 'Calendar with plane',
    text: 'Schedule Upcoming Trips',
  },
  {
    src: Seat3,
    alt: 'Records',
    text: "Keep detailed records of your passenger's preferences",
  },
  {
    src: Airplane,
    alt: 'Track',
    text: 'Track your tails most important details',
  },
  {
    src: Share,
    alt: 'Sharing',
    text: 'Easily share with your fellow crew members and contractors',
  },
];

const IconCard = (props) => {
  return (
    <IconWithText>
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
      >
        <motion.div variants={animationVariants}>
          <Image
            src={props.icon.src}
            alt={props.icon.alt}
            height="5em"
            width="5em"
          />
          <p>{props.icon.text}</p>
        </motion.div>
      </motion.div>
    </IconWithText>
  );
};

const IconCardGrid = () => {
  return (
    <IconGrid>
      {icons.map((icon, i) => {
        return <IconCard key={i} icon={icon} />;
      })}
    </IconGrid>
  );
};

export default IconCardGrid;
