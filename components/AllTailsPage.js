import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import ErrorComponent from "./ErrorComponent";
import Tail from "./SingleTailCard";
import MasterGrid from "../styles/MasterGrid";
export const ALL_TAILS_QUERY = gql`
  query ALL_TAILS_QUERY {
    tailNumbers {
      data {
        id
        attributes {
          TailNumber
          AircraftType
          HomeICAO
          Slug
        }
      }
    }
  }
`;

export default function Tails({ tailsArray }) {
  console.log("tails", tailsArray);
  const { data, error, loading } = useQuery(ALL_TAILS_QUERY);
  console.log(data?.tailNumbers?.data);
  if (loading) return <h3>Loading</h3>;
  if (error) return <ErrorComponent error={error.message} />;
  return (
    <MasterGrid>
      {data?.tailNumbers?.data.map((tail) => (
        <Tail key={tail.id} tail={tail} />
      ))}
    </MasterGrid>
  );
}
