/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Link from 'next/link';
import FlagIcon from '@mui/icons-material/Flag';
import CardItem from '../styles/CardItem';
import dateConversion from '../lib/dateConversion';
import ButtonGrid from '../styles/ButtonGrid';

export default function TripCard({ trip, tailNum }) {
  const t = trip.attributes;
  function isDateBeforeToday(date) {
    return new Date(date) < new Date(new Date().toDateString());
  }
  return (
    <CardItem>
      <div>
        <Link href={`/trip/${trip.attributes.Slug}`}>
          <h2>{t.Routing} </h2>
        </Link>

        <h2>
          {dateConversion(t.StartDate)}-{dateConversion(t.EndDate)}
        </h2>
      </div>
      {!trip.attributes.DebriefComplete && isDateBeforeToday(t.EndDate) ? (
        <Link href={`/edittrip/${trip.attributes.Slug}`}>
          <FlagIcon color="error" fontSize="large" />
        </Link>
      ) : (
        ''
      )}
    </CardItem>
  );
}
