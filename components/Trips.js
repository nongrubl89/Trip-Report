import TripCard from "./TripCard";
import MasterGrid from "../styles/MasterGrid";
export default function Trips({ trips, tailNum }) {
  console.log(trips.data);
  if (trips.data.length <= 0) return <div>No trips in database</div>;
  else
    return (
      <MasterGrid>
        {" "}
        {trips.data.map((trip) => (
          <TripCard key={trip.id} trip={trip} tailNum={tailNum} />
        ))}
      </MasterGrid>
    );
}
