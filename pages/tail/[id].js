import TailPage from "../../components/SingleTailPage";
import { useRouter } from "next/router";

export default function SingleTailPage({ query }) {
  const router = useRouter();
  console.log(router.query.id);
  return <TailPage id={router.query.id} />;
}
