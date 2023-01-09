import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import ErrorComponent from "./ErrorComponent";
import LargeHeaderCard from "../styles/SingleTail";
import Link from "next/link";
import ButtonGrid from "../styles/ButtonGrid";
const SINGLE_TRIP_QUERY = gql`
  query SINGLE_TRIP_QUERY($uuid: String!) {
    trips(filters: { uuid: { eq: $uuid } }) {
      data {
        id
        attributes {
          Routing
          CateringDetails
          CabinAttendantName
          createdAt
          Feedback
          StartDate
          EndDate
        }
      }
    }
  }
`;

export default function SingleTrip({ uuid }) {
  console.log("uuid", uuid);
  const { data, loading, error } = useQuery(SINGLE_TRIP_QUERY, {
    variables: { uuid: uuid },
  });

  const tripDetails = data?.trips?.data[0].attributes;
  console.log(tripDetails);
  if (error) return <ErrorComponent error={error.message} />;
  if (loading) return <div>Loading...</div>;
  return (
    <LargeHeaderCard>
      <div>
        <h2>
          <strong>{tripDetails.Routing}</strong>
        </h2>
        <h3>
          {tripDetails.StartDate} through {tripDetails.EndDate}
        </h3>
        <hr></hr>
        <p>
          <strong>Cabin Attendant:</strong> {tripDetails.CabinAttendantName}
        </p>
        <p>
          <strong>Catering Details: </strong>
          {tripDetails.CateringDetails}
        </p>
      </div>
      <div style={{ display: "grid" }}>
        <p>
          <strong>Feedback from passengers:</strong>
          {"\n"}
          {tripDetails.Feedback}
        </p>
        <ButtonGrid alignItems="end" placeSelf="end">
          <button>Delete</button>

          <Link href="#">
            <button>Edit Trip Details</button>
          </Link>
        </ButtonGrid>
      </div>
    </LargeHeaderCard>
  );
}
