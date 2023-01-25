/* eslint-disable react/prop-types */
import Link from 'next/link';
import { useRouter } from 'next/router';
import CardItem from '../styles/CardItem';
import dateConversion from '../lib/dateConversion';
import ButtonGrid from '../styles/ButtonGrid';

export default function TripCard({ trip, tailNum }) {
  const router = useRouter();
  const t = trip.attributes;
  console.log(typeof t.StartDate);
  function isDateBeforeToday(date) {
    return new Date(date) < new Date(new Date().toDateString());
  }
  console.log(isDateBeforeToday(t.StartDate));
  console.log(trip.attributes.TripStatus);
  return (
    <CardItem height="max-content">
      <Link href={`/trip/${trip.attributes.uuid}`}>
        <h2>{t.Routing}</h2>
      </Link>
      <h2>
        {dateConversion(t.StartDate)}-{dateConversion(t.EndDate)}
      </h2>
      {isDateBeforeToday(t.EndDate) && trip.attributes.TripStatus === false ? (
        <ButtonGrid>
          <button type="button">
            <Link href="#">Complete Trip Debrief</Link>
          </button>
        </ButtonGrid>
      ) : (
        ''
      )}
    </CardItem>
  );
}
