import TailPage from "../../../components/TailPage";

export default function SingleTailPage({ query }) {
  console.log(query);
  return <TailPage id={query.id} />;
}
