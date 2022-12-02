import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import ErrorComponent from "./ErrorComponent";
import SingleTail from "../styles/SingleTail";
import Button from "../styles/Button";
import Link from "next/link";
import Trips from "./Trips";
const SINGLE_TAIL_QUERY = gql`
  query SINGLE_TAIL_QUERY($Slug: String!) {
    tailNumbers(filters: { Slug: { eq: $Slug } }) {
      data {
        id
        attributes {
          TailNumber
          Owner
          PIC
          SIC
          CabinAttendant
          StandardStock
          AircraftType
          HomeICAO
          Slug
          trips {
            data {
              id
              attributes {
                StartDate
                EndDate
                Routing
              }
            }
          }
        }
      }
    }
  }
`;

export default function TailPage({ id }) {
  const { data, loading, error } = useQuery(SINGLE_TAIL_QUERY, {
    variables: { Slug: id },
  });
  console.log(id);
  const tailData = data?.tailNumbers?.data[0].attributes;
  if (loading) return <h3>Loading</h3>;
  if (error) return <ErrorComponent error={error.message} />;
  return (
    <>
      <SingleTail>
        <div>
          <h2>
            <strong>{tailData.TailNumber}</strong>
          </h2>
          <hr></hr>
          <p>
            <strong>Owner:</strong> {tailData.Owner}
          </p>
          <p>
            <strong>PIC:</strong> {tailData.PIC}
          </p>
          <p>
            <strong>SIC:</strong>
            {tailData.SIC}
          </p>
          <p>
            <strong>Cabin Attendant:</strong> {tailData.CabinAttendant}
          </p>
        </div>
        <p>
          <strong>Standard Stock:</strong>
          {"\n"}
          {tailData.StandardStock}
        </p>
      </SingleTail>
      <Button>
        <Link href={`/newtrip/${id}`}>Add a new trip</Link>
      </Button>
      <Trips tailNum={tailData.Slug} trips={tailData.trips}></Trips>
    </>
  );
}
