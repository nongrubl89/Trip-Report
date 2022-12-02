import Tails from "../components/Tails";

export default function TailsPage({ tailsArray }) {
  return (
    <div>
      <Tails />
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      tailsArray: ["onetail"],
    },
  };
}
