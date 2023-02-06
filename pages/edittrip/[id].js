import { useRouter } from 'next/router';
import UpdateTrip from '../../components/UpdateTrip';

export default function EditTrip() {
  const router = useRouter();
  const { query } = router;
  console.log(query.id);
  return <UpdateTrip uuid={query.id} />;
}
