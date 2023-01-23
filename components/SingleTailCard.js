/* eslint-disable react/prop-types */
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import CardItem from '../styles/CardItem';

// eslint-disable-next-line react/prop-types
export default function SingleTailCard({ tail }) {
  return (
    <CardItem>
      <Link href={`/tail/${tail.attributes.Slug}`}>
        <h2>
          {tail.attributes.TailNumber} <FontAwesomeIcon icon={faPlane} />
        </h2>
      </Link>

      <p>Aircraft: {tail.attributes.AircraftType}</p>
      <p>Homebase: {tail.attributes.HomeICAO}</p>
    </CardItem>
  );
}
