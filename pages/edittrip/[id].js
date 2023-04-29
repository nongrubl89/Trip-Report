import { useRouter } from 'next/router';
import UpdateTrip from '../../components/UpdateTrip';

export default function EditTrip() {
  const router = useRouter();
  const { query } = router;
  return <UpdateTrip Slug={query.id} />;
}
