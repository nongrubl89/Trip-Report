/* eslint-disable react/prop-types */
import { PropaneSharp } from '@mui/icons-material';
import TripCard from './TripCard';
import MasterGrid from '../styles/MasterGrid';
import TitleItem from '../styles/Title';
import isDateBeforeToday from '../lib/datePrior';
import CardItem from '../styles/CardItem';

const EmptyTripCard = ({ status }) => {
  return (
    <CardItem>
      <h4>No {status} Trips In Database</h4>
    </CardItem>
  );
};

export default function Trips({ trips, tailNum }) {
  const previousTrips = trips.data.filter(
    (trip) =>
      isDateBeforeToday(trip.attributes.StartDate, trip.attributes.EndDate) ===
      'Complete'
  );
  const tripsInProgress = trips.data.filter(
    (trip) =>
      isDateBeforeToday(trip.attributes.StartDate, trip.attributes.EndDate) ===
      'In Progress'
  );
  const tripsUpcoming = trips.data.filter(
    (trip) =>
      isDateBeforeToday(trip.attributes.StartDate, trip.attributes.EndDate) ===
      'Upcoming'
  );
  if (trips.data.length <= 0)
    return (
      <MasterGrid>
        <EmptyTripCard status="" />
      </MasterGrid>
    );
  return (
    <>
      <TitleItem>Previous Trips</TitleItem>
      <MasterGrid>
        {previousTrips.length > 0 ? (
          previousTrips.map((trip) => (
            <TripCard
              key={trip.id}
              trip={trip}
              tailNum={tailNum}
              uuid={trip.uuid}
            />
          ))
        ) : (
          <EmptyTripCard status="Previous" />
        )}
      </MasterGrid>
      <TitleItem>Trips in Progress</TitleItem>
      <MasterGrid>
        {tripsInProgress.length > 0 ? (
          tripsInProgress.map((trip) => (
            <TripCard
              key={trip.id}
              trip={trip}
              tailNum={tailNum}
              uuid={trip.uuid}
            />
          ))
        ) : (
          <EmptyTripCard status="In Progress" />
        )}
      </MasterGrid>
      <TitleItem>Upcoming Trips</TitleItem>
      <MasterGrid>
        {tripsUpcoming.legth > 0 ? (
          tripsUpcoming.map((trip) => (
            <TripCard
              key={trip.id}
              trip={trip}
              tailNum={tailNum}
              uuid={trip.uuid}
            />
          ))
        ) : (
          <EmptyTripCard status="Upcoming" />
        )}
      </MasterGrid>
    </>
  );
}
