import { useRouter } from 'next/router';
import SingleTrip from '../../components/SingleTrip';

export default function TripPage() {
  const router = useRouter();
  const { query } = router;
  return <SingleTrip Slug={query.id} />;
}
