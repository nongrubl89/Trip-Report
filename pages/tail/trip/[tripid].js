import { useRouter } from "next/router";

export default function SingleTripPage({ query }) {
  const router = useRouter();
  const { tailID, tripID } = router.query;
  return (
    <div>
      Single Trip Page for {tailID} {tripID}
    </div>
  );
}
