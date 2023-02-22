import { useRouter } from 'next/router';
import TailPage from '../../components/SingleTailPage';

export default function SingleTailPage({ query }) {
  const router = useRouter();
  console.log(router.query.id);
  return <TailPage id={router.query.id} />;
}
