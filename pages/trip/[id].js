import { useRouter } from 'next/router';
import SingleTrip from '../../components/SingleTrip';

export default function TripPage() {
  const router = useRouter();
  const { query } = router;
  console.log(query);
  return <SingleTrip uuid={query.id} />;
}
