import { useRouter } from 'next/dist/client/router';
import NewTrip from '../../components/NewTrip';

export default function NewTripPage() {
  const query = useRouter();
  const tail = query.query.id;
  return <NewTrip tail={tail} />;
}
