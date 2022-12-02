import CardItem from "../styles/CardItem";
import dateConversion from "../lib/dateConversion";
import Link from "next/link";
import { useRouter } from "next/router";

export default function TripCard({ trip, tailNum }) {
  const router = useRouter();
  const t = trip.attributes;
  return (
    <CardItem>
      <Link href={`/tail/${tailNum}/trip/${trip.id}`}>
        <h2>{t.Routing}</h2>
      </Link>
      <h2>
        {dateConversion(t.StartDate)}-{dateConversion(t.EndDate)}
      </h2>
    </CardItem>
  );
}
