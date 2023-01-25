/* eslint-disable react/prop-types */
import TripCard from './TripCard';
import MasterGrid from '../styles/MasterGrid';
import TitleItem from '../styles/Title';

export default function Trips({ trips, tailNum }) {
  console.log(trips.data);
  if (trips.data.length <= 0)
    return (
      <MasterGrid>
        <h3>No Trips In Database</h3>
      </MasterGrid>
    );
  return (
    <>
      {trips.data.map((trip) =>
        trip.attributes.TripStatus ? (
          <>
            <TitleItem>Previous Trips</TitleItem>
            <MasterGrid>
              <TripCard
                key={trip.id}
                trip={trip}
                tailNum={tailNum}
                uuid={trip.uuid}
              />
            </MasterGrid>
          </>
        ) : (
          <>
            <TitleItem>Upcoming Trips</TitleItem>
            <MasterGrid>
              <TripCard
                key={trip.id}
                trip={trip}
                tailNum={tailNum}
                uuid={trip.uuid}
              />
            </MasterGrid>
          </>
        )
      )}
    </>
  );
}
