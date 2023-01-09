import NewTrip from "../../components/NewTrip";
import { useRouter } from "next/dist/client/router";

export default function NewTripPage() {
  const query = useRouter();
  const tail = query.query.id;
  return <NewTrip tail={tail} />;
}
