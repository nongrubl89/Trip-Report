import TripCard from './TripCard';
import MasterGrid from '../styles/MasterGrid';

export default function Trips({ trips, tailNum }) {
  console.log(trips.data);
  if (trips.data.length <= 0)
    return (
      <MasterGrid>
        <h3>No trips in database</h3>
      </MasterGrid>
    );
  return (
    <MasterGrid>
      {' '}
      {trips.data.map((trip) => (
        <TripCard
          key={trip.id}
          trip={trip}
          tailNum={tailNum}
          uuid={trip.uuid}
        />
      ))}
    </MasterGrid>
  );
}
