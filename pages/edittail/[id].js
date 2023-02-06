import { useRouter } from 'next/dist/client/router';
import UpdateTail from '../../components/UpdateTail';

export default function EditTailPage() {
  const router = useRouter();
  return <UpdateTail tail={router.query.id} />;
}
