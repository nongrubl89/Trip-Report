import { useRouter } from 'next/router';
import TailPage from '../../components/SingleTailPage';

export default function SingleTailPage() {
  const router = useRouter();
  return <TailPage id={router.query.id} />;
}
