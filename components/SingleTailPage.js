import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import ErrorComponent from "./ErrorComponent";
import SingleTail from "../styles/SingleTail";
import Button from "../styles/Button";
import Link from "next/link";
import Trips from "./Trips";
import LargeHeaderCard from "../styles/SingleTail";
import TitleItem from "../styles/Title";
import ButtonGrid from "../styles/ButtonGrid";
export const SINGLE_TAIL_QUERY = gql`
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
                uuid
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
  console.log("id", id);
  const tailData = data?.tailNumbers?.data[0].attributes;
  if (loading) return <h3>Loading</h3>;
  if (error) return <ErrorComponent error={error.message} />;
  return (
    <>
      <LargeHeaderCard>
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
        <div style={{ display: "grid", gap: "1em" }}>
          <p>
            <strong>Standard Stock:</strong>
            {"\n"}
            {tailData.StandardStock}
          </p>
          <ButtonGrid alignItems="end" placeSelf="end">
            <Link
              href={{
                pathname: `/newtrip/${tailData.Slug}`,
                query: {
                  tailNumber: tailData.TailNumber,
                },
              }}
            >
              <button>Add a trip</button>
            </Link>
            <Link href="/">
              <button>Edit Tail Details</button>
            </Link>
          </ButtonGrid>
        </div>
      </LargeHeaderCard>
      <TitleItem>Previous Trips</TitleItem>
      <Trips tailNum={tailData.Slug} trips={tailData.trips}></Trips>
    </>
  );
}
