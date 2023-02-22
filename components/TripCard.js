/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Link from 'next/link';
import CardItem from '../styles/CardItem';
import dateConversion from '../lib/dateConversion';
import ButtonGrid from '../styles/ButtonGrid';

export default function TripCard({ trip, tailNum }) {
  const t = trip.attributes;
  console.log(typeof t.StartDate);
  function isDateBeforeToday(date) {
    return new Date(date) < new Date(new Date().toDateString());
  }
  console.log(isDateBeforeToday(t.StartDate));
  console.log(trip.attributes.TripStatus);
  console.log(trip.attributes.DebriefComplete);
  return (
    <CardItem>
      <Link href={`/trip/${trip.attributes.uuid}`}>
        <h2>{t.Routing}</h2>
      </Link>
      <h2>
        {dateConversion(t.StartDate)}-{dateConversion(t.EndDate)}
      </h2>
      {!trip.attributes.DebriefComplete && isDateBeforeToday(t.EndDate) ? (
        <ButtonGrid>
          <Link href={`/edittrip/${trip.attributes.uuid}`}>
            <button type="button">Complete Trip Debrief</button>
          </Link>
        </ButtonGrid>
      ) : (
        ''
      )}
    </CardItem>
  );
}
