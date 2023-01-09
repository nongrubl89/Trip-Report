import CardItem from "../styles/CardItem";
import dateConversion from "../lib/dateConversion";
import Link from "next/link";
import { useRouter } from "next/router";

export default function TripCard({ trip, tailNum }) {
  const router = useRouter();
  const t = trip.attributes;
  console.log(trip);
  return (
    <CardItem>
      <Link href={`/trip/${trip.attributes.uuid}`}>
        <h2>{t.Routing}</h2>
      </Link>
      <h2>
        {dateConversion(t.StartDate)}-{dateConversion(t.EndDate)}
      </h2>
    </CardItem>
  );
}
