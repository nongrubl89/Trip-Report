/* eslint-disable react/prop-types */
import TripCard from './TripCard';
import MasterGrid from '../styles/MasterGrid';
import TitleItem from '../styles/Title';

export default function Trips({ trips, tailNum }) {
  console.log(trips.data);
  const previousTrips = trips.data.filter((trip) => trip.attributes.TripStatus);
  const upcomingTrips = trips.data.filter(
    (trip) => !trip.attributes.TripStatus
  );
  console.log(previousTrips);
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
      <TitleItem>Upcoming Trips</TitleItem>
      <MasterGrid>
        {upcomingTrips.map((trip) => (
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
