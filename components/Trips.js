/* eslint-disable react/prop-types */
import TripCard from './TripCard';
import MasterGrid from '../styles/MasterGrid';
import TitleItem from '../styles/Title';
import isDateBeforeToday from '../lib/datePrior';

export default function Trips({ trips, tailNum }) {
  console.log(trips);
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
        <h3>No Trips In Database</h3>
      </MasterGrid>
    );
  return (
    <>
      <TitleItem>Previous Trips</TitleItem>
      <MasterGrid>
        {previousTrips.map((trip) => (
          <TripCard
            key={trip.id}
            trip={trip}
            tailNum={tailNum}
            uuid={trip.uuid}
          />
        ))}
      </MasterGrid>
      <TitleItem>Trips in Progress</TitleItem>
      <MasterGrid>
        {tripsInProgress.map((trip) => (
          <TripCard
            key={trip.id}
            trip={trip}
            tailNum={tailNum}
            uuid={trip.uuid}
          />
        ))}
      </MasterGrid>
      <TitleItem>Upcoming Trips</TitleItem>
      <MasterGrid>
        {tripsUpcoming.map((trip) => (
          <TripCard
            key={trip.id}
            trip={trip}
            tailNum={tailNum}
            uuid={trip.uuid}
          />
        ))}
      </MasterGrid>
    </>
  );
}
